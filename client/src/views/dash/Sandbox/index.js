import React, {useEffect, useState} from "react";
import {Button, Input, Switch, Typography, message, notification, Select, Icon} from 'antd';
import * as Styles from './styles';
import {sandbox, post} from '~/helpers/api';
import PlayButton from "~/components/PlayButton";
const {Text} = Typography;

function Sandbox() {
    const [json, setJson] = useState({});
    const [devices, setDevices] = useState([]);
    const [disabled, setDisabled] = useState([]);

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
            console.log(e);
            message.error(e.response.data.error)
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
                <Text>User:</Text>
                <Input
                    onChange={
                        (e) => {
                            e.persist();
                            setJson($ => ({...$, user: e.target.value}))
                        }
                    } />
                <Text>Preset:</Text>
                <Select
                    disabled={disabled.includes("preset")}
                    placeholder="Select a preset"
                    allowClear
                    onChange={
                        (e) => {
                            setJson($ => ({...$, preset: e}))
                        }
                    }
                >
                    <Select.Option key="wakeup">Wake Up</Select.Option>
                    <Select.Option key="breakfast">Breakfast</Select.Option>
                    <Select.Option key="lunch">Lunch</Select.Option>
                    <Select.Option key="dinner">Dinner</Select.Option>
                    <Select.Option key="timetoleave">Time To Leave</Select.Option>
                    <Select.Option key="arrivedhome">Arrived Home</Select.Option>
                    <Select.Option key="ontheway">On The Way</Select.Option>
                    <Select.Option key="movietime">Movie Time</Select.Option>
                    <Select.Option key="tvtime">TV Time</Select.Option>
                    <Select.Option key="bedtime">Bed Time</Select.Option>
                </Select>
                <Text>Command:</Text>
                <Input
                    disabled={disabled.includes("command")}
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
                            disabled={disabled.includes("broadcast")}
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
                            disabled={disabled.includes("converse")}
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