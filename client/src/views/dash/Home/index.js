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
    const [QHEnabled, setQHEnabled] = useState();
    const [quietHours, setQuietHours] = useState();
    const [loading, setLoading] = useState(true);

    const formItemLayout = {
        labelCol: {
            xs: { span: 10 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

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
            await delay(1000);
            const obj = {
                muteStartup: !!startupSound,
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
            setStartupSound(data.muteStartup);
            setPort(data.port);
            setQHEnabled(data.quietHours.enabled);
            if(data.quietHours.enabled) {
                setQuietHours({start: data.quietHours.start, end: data.quietHours.end})
            }
            setLoading(false);
            setInitGet(false);
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
        if(QHEnabled) {
            return (
                <Styles.QuietHours>
                    <Text>Start Time:</Text>
                    <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} />

                    <Text>End Time:</Text>
                    <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} />
                </Styles.QuietHours>
            )
        }
        return null;
    }

    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Startup Sound:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            checked={!startupSound}
                            onChange={(e) => setStartupSound(e) } />
                </Styles.Switch>

                <Text>Port Number:</Text>
                <InputNumber onChange={(e) => setPort(e) } defaultValue={port} />

                <Text>Quiet Hours:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="On"
                            unCheckedChildren="Off"
                            checked={QHEnabled}
                            onChange={(e) => setQHEnabled(e) } />
                </Styles.Switch>

                <div></div>
                <QuietHours/>
            </Styles.Form>
        </Styles.Container>)
}

export default Form.create()(Home);