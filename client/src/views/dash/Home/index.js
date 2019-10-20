import React, {useEffect, useState} from "react";
import {Form, InputNumber, Switch, message, TimePicker} from "antd";
import {post} from '~/helpers/api';
import {delay} from '~/helpers/misc';
import * as Styles from './styles';
import LoadingAnimation from "~/components/LoadingAnimation";
import moment from 'moment';
import Text from "antd/es/typography/Text";


function Home({form}){
    const [initGet, setInitGet] = useState(true);
    const [startupSound, setStartupSound] = useState();
    const [port, setPort] = useState();
    const [quietHours, setQuietHours] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getConfig()
    }, []);

    useEffect(() => {
        if(!initGet) {
            updateConfig()
        }
    }, [startupSound, port, quietHours]);

    async function updateConfig() {
        try {
            const obj = {
                muteStartup: startupSound,
                port,
                quietHours
            };
            await post(obj, 'updateConfig');
        } catch (e) {
            message.error(e.message);
        }
    }

    async function getConfig() {
        try {
            const {data} = await post({}, 'getConfig');
            console.log(data)
            setStartupSound(data.muteStartup);
            setPort(data.port);
            setQuietHours(data.quietHours);
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
                <InputNumber onChange={(e) => setPort(e) } defaultValue={port} />

                <Text>Quiet Hours:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            checked={quietHours.enabled}
                            onChange={(e) => setQuietHours($ => ({...$, enabled: e}))} />
                </Styles.Switch>

                <div></div>
                <QuietHours/>
            </Styles.Form>
        </Styles.Container>)
}

export default Form.create()(Home);