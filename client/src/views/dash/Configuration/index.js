import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import {Input, InputNumber, Switch, message, TimePicker, Button, Icon} from "antd";
import {post} from '~/helpers/api';
import * as Styles from './styles';
import LoadingAnimation from "~/components/LoadingAnimation";
import GoogleDevices from "./GoogleDevices";
import Users from "./Users";
import moment from 'moment';
import Text from "antd/es/typography/Text";


function Configuration({history}){
    const [initGet, setInitGet] = useState(true);
    const [startupSound, setStartupSound] = useState();
    const [users, setUsers] = useState([]);
    const [language, setLanguage] = useState([]);
    const [port, setPort] = useState();
    const [quietHours, setQuietHours] = useState();
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [forceReboot, setForceReboot] = useState(false);

    useEffect(() => {
        getConfig()
    }, []);

    useEffect(() => {
        if(!initGet) {
            updateConfig()
        }
        //eslint-disable-next-line
    }, [startupSound, port, quietHours, devices, language]);

    async function updateConfig() {
        try {
            const obj = {
                muteStartup: startupSound,
                port,
                quietHours,
                devices,
                "conversation.lang": language
            };
            await post(obj, 'updateConfig');
            if(forceReboot) {
                message.success("Assistant Relay restarting");
                await post({}, 'restart');
                console.log(`${window.location.hostname}:${port}`)
                window.location.href(`http://${window.location.hostname}:${port}`)
            }
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
            setInitGet(false);
            setLoading(false);
        } catch (e) {
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
                        defaultValue={moment(quietHours.start, 'HH:mm')}
                        format={'HH:mm'}
                        onChange={(t,s) => setQuietHours({enabled: true, start: s, end: quietHours.end})}/>

                    <Text>End Time:</Text>
                    <TimePicker
                        defaultValue={moment(quietHours.end, 'HH:mm')}
                        format={'HH:mm'}
                        onChange={(t,s) => setQuietHours({enabled: true, start: quietHours.start, end: s})}/>
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
                            onChange={(e) => {
                                console.log(e)
                                setStartupSound(e)
                            } } />
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
                <Input onChange={(e) => setLanguage(e.target.value) } defaultValue={language} />

                {/*<Text>Users:</Text>*/}
                {/*<Users />*/}

                {/*<Text>Google Devices:</Text>*/}
                {/*<GoogleDevices devices={devices} setDevices={(e) => setDevices(e)}/>*/}
            </Styles.Form>
        </Styles.Container>)
}

export default withRouter(Configuration);