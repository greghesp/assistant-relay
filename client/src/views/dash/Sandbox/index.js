import React, {useEffect, useState} from "react";
import {Button, Input, Switch, Typography, message, notification, Select, Icon} from 'antd';
import * as Styles from './styles';
import {sandbox, post} from '~/helpers/api';
import PlayButton from "~/components/PlayButton";
const {Text} = Typography;

function Sandbox() {
    const [json, setJson] = useState({});
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        getDevices();
    },[]);

    async function submit() {
        try {
            const response = await sandbox(json);
            if(!response.data.success) {
                return notify("Quiet Hours Enabled", response.data.error,
                    <Icon type="warning" style={{ color: '#e5ad29' }}/>);
            }
            return notify("Command Successful", <NotificationContent
                audio={response.data.audio}
                json={json}
                response={response.data.response}/>,
                <Icon type="check-circle"  style={{ color: '#26a63e' }}/>
        );
        } catch (e) {
            message.error(e.message)
        }
    }

    function notify(message, description,icon){
        return notification.open({
            style: {
                width: 600,
                marginLeft: 335 - 600,
            },
            message,
            description,
            icon,
        });
    }

    async function getDevices() {
        try {
            const response = await post({}, 'getConfig');
            setDevices(response.data.devices)
        } catch (e) {
            message.error(e.message)
        }
    }

    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Name:</Text>
                <Input
                    onChange={
                        (e) => {
                            e.persist();
                            setJson($ => ({...$, name: e.target.value}))
                        }
                    } />
                <Text>Command:</Text>
                <Input
                    onChange={
                        (e) => {
                            e.persist();
                            setJson($ => ({...$, command: e.target.value}));
                        }
                    } />
                <Text>Broadcast:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={
                                (e) => {
                                    setJson($ => ({...$, broadcast: e}))
                                }
                            }/>
                </Styles.Switch>
                <Text>Converse:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={
                                (e) => {
                                    setJson($ => ({...$, converse: e}))
                                }
                            }/>
                </Styles.Switch>
                {/*<Text>Devices:</Text>*/}
                {/*<Select*/}
                {/*    mode={"multiple"}*/}
                {/*    placeholder="Select some devices"*/}
                {/*    onChange={*/}
                {/*        (e) => {*/}
                {/*            setJson($ => ({...$, devices: e}))*/}
                {/*        }*/}
                {/*    }*/}
                {/*>*/}
                {/*    {devices.map(d => {*/}
                {/*        return <Select.Option key={d.name}>{d.name}</Select.Option>*/}
                {/*    })}*/}
                {/*</Select>*/}
                <Text>JSON Data:</Text>
                <JSONData json={json}/>
                <div/>
                <Button type="primary" onClick={() => submit()}>Submit</Button>
            </Styles.Form>
        </Styles.Container>
    )
}

function JSONData({json}) {
    return (
        <Styles.JsonBox>
            {JSON.stringify(json, null, 4)}
        </Styles.JsonBox>
    )
}

function NotificationContent({audio, json, response}) {
    return (
        <div>
            <Styles.ResponseContainer >
                <Styles.Play>
                    <PlayButton url={audio}/>
                </Styles.Play>
                <Styles.QuoteWrapper>
                    {json.command}
                </Styles.QuoteWrapper>
                <Styles.Response>
                    {response.length > 0 ?
                        <ResponseText t={response}/>
                        : "No text response given, click play to hear the audio" }
                </Styles.Response>
            </Styles.ResponseContainer>
        </div>
    )
}

function ResponseText({t}) {
    return t.split('\n').map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
            {text}
            <br />
        </React.Fragment>
    ))
}

export default Sandbox;