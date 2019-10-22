import React, {useState} from "react";
import {Button, Input, Switch, Typography, message, notification} from 'antd';
import * as Styles from './styles';
import {sandbox} from '~/helpers/api';
import PlayButton from "~/components/PlayButton";

const {Text} = Typography;

function Sandbox() {
    const [json, setJson] = useState({});

    async function submit() {
        try {
            const response = await sandbox(json);
            notification.open({
                style: {
                    width: 600,
                    marginLeft: 335 - 600,
                },
                message: 'Command Successful',
                description: <NotificationContent
                    audio={response.data.audio}
                    json={json}
                    response={response.data.response}/>,
            });
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
                    <PlayButton audio={audio}/>
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