import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import {Input, InputNumber, Switch, message, TimePicker, Button, Icon, Select} from "antd";
import {post} from '~/helpers/api';
import * as Styles from './styles';
import LoadingAnimation from "~/components/LoadingAnimation";
import moment from 'moment';
import Text from "antd/es/typography/Text";

const {Option} = Select;

function Configuration({history}){
    const [initGet, setInitGet] = useState(true);
    const [startupSound, setStartupSound] = useState();
    const [users, setUsers] = useState([]);
    const [language, setLanguage] = useState([]);
    const [port, setPort] = useState();
    const [quietHours, setQuietHours] = useState();
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [devices, setDevices] = useState([]);
    const [casting, setCasting] = useState();
    const [defaultCast, setDefaultCast] = useState();
    const [forceReboot, setForceReboot] = useState(false);
    const [pip, setPip] = useState('pip3');

    useEffect(() => {
        getConfig()
    }, []);

    async function updateConfig() {
        try {
            const obj = {
                muteStartup: startupSound,
                port,
                quietHours,
                devices,
                "conversation.lang": language,
                castEnabled: casting,
                "pipCommand": pip
            };
            await post(obj, 'updateConfig');
            if(casting) {
                message.info("Please Wait - Installing Cast Dependencies");
                await post({}, 'installCast');
                message.success("Casting Enabled");
                //return rebootServer();
            }
            //if(forceReboot) rebootServer();
        } catch (e) {
            console.log(e.response);
            message.error(e.response.data.message);
        }
    }

    async function rebootServer() {
        try {
            message.success("Assistant Relay restarting");
            await post({}, 'restart');
            message.success(`Restart Successful - Visit http://${window.location.hostname}:${port} to continue`)
        } catch (e) {
            message.error(e.message);
        }
    }

    async function getConfig() {
        try {
            const {data} = await post({}, 'getConfig');
            setStartupSound(data.muteStartup);
            setPort(data.port);
            setQuietHours(data.quietHours);
            setDevices(data.devices);
            setLanguage(data.language);
            setCasting(data.castEnabled);
            setDefaultCast(data.castEnabled);
            setInitGet(false);
            setLoading(false);
            setPip(data.pipCommand);
        } catch (e) {
            message.error(e.message);
        }
    }

    async function deleteDevice() {
        try {
            setDeleting(true);
            await post({}, 'deleteDevice');
            setDeleting(false);
        } catch (e) {
            setDeleting(false);
            message.error(e.message);
        }
    }

    if(loading) return (
        <Styles.Loading>
            <div>
                <LoadingAnimation/>
            </div>
        </Styles.Loading>
    );

    function QuietHours() {
        if(quietHours.enabled) {
            return (
                <Styles.QuietHours>
                    <Text>Start Time:</Text>
                    <TimePicker
                        id="start-time"
                        defaultValue={moment(quietHours.start, 'HH:mm')}
                        format={'HH:mm'}
                        onChange={(t,s) => {
                            if(!s) s = "00:00";
                            setQuietHours({enabled: true, start: s, end: quietHours.end})
                        }}/>

                    <Text>End Time:</Text>
                    <TimePicker
                        id="end-time"
                        defaultValue={moment(quietHours.end, 'HH:mm')}
                        format={'HH:mm'}
                        onChange={(t,s) => {
                            if(!s) s = "00:00";
                            setQuietHours({enabled: true, start: quietHours.start, end: s})
                        }}/>
                </Styles.QuietHours>
            )
        }
        return null;
    }

    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Mute Startup Sound:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked={startupSound}
                            onChange={(e) => {setStartupSound(e)} } />
                </Styles.Switch>

                <Text>Port Number:</Text>
                <InputNumber onChange={(e) => {
                    setPort(e);
                    setForceReboot(true);
                } } defaultValue={port} />

                <Text>Quiet Hours:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            checked={quietHours.enabled}
                            onChange={(e) => setQuietHours($ => ({...$, enabled: e}))} />
                </Styles.Switch>

                <div></div>
                {quietHours.enabled ? <QuietHours/> : <div></div>}

                <Text>Conversation Language:</Text>
                <Select defaultValue={language} style={{ width: 220 }} onChange={(e) => setLanguage(e)}>
                    <Option value="de-DE">German (Germany)</Option>
                    <Option value="en-AU">English (Australia)</Option>
                    <Option value="en-CA">English (Canada)</Option>
                    <Option value="en-GB">English (United Kingdom)</Option>
                    <Option value="en-IN">English (India)</Option>
                    <Option value="en-US">English (United States)</Option>
                    <Option value="fr-CA">French (Canada)</Option>
                    <Option value="fr-FR">French (France)</Option>
                    <Option value="it-IT">Italian (Italy)</Option>
                    <Option value="ja-JP">Japanese (Japan)</Option>
                    <Option value="es-ES">Spanish (Spain)</Option>
                    <Option value="es-MX">Spanish (Mexico)</Option>
                    <Option value="ko-KR">Korean (South Korea)</Option>
                    <Option value="pt-BR">Portuguese (Brazil)</Option>
                </Select>

                <Text>Casting Enabled:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            checked={casting}
                            onChange={(e) => {
                                setCasting(e);
                                setForceReboot(true);
                            }} />
                </Styles.Switch>

                <div></div>
                {casting ?
                    <Styles.Cast>
                        <Text>pip3 Command: </Text>
                        <Input
                            id="pip3"
                            onChange={
                                (e) => {
                                    setPip(e.target.value)
                                }
                            } defaultValue={pip} />
                    </Styles.Cast>
                    : <div></div>}


                <Text>Delete Registered Devices:</Text>
                <Button
                        danger
                        onClick={() => deleteDevice()}>Delete Device</Button>

                <div></div>
                <Button type="primary" onClick={() => updateConfig()}>Save</Button>

            </Styles.Form>
        </Styles.Container>)
}

export default withRouter(Configuration);
