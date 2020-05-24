import React, {useEffect, useState} from "react";
import {Button, Input, Switch, Typography, message, notification, Select, Icon} from 'antd';
import * as Styles from './styles';
import {sandbox, cast} from '~/helpers/api';
import PlayButton from "~/components/PlayButton";
const {Text} = Typography;

function Sandbox() {
    const [json, setJson] = useState({});
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDevices();
    },[]);


    async function submit() {
        try {
            const response = await cast(json,'');
            if(!response.data.success) {
                return notify("Something went wrong",
                    <Icon type="warning" style={{ color: '#e5ad29' }}/>);
            }
            return notify("Command Successful",
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
            const response = await cast({}, 'search');
            setDevices(response.data.devices);
            setLoading(false);
        } catch (e) {
            message.error(e.response.data.error)
        }
    }

    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Device:</Text>
                <Select
                    placeholder="Select a device"
                    loading={loading}
                    allowClear
                    onChange={
                        (e) => {
                            setJson($ => ({...$, device: e}))
                        }
                    }
                >
                    {devices.map(d => {
                        return <Select.Option value={d.name}>{d.name}</Select.Option>
                    })}
                </Select>
                <Text>Source:</Text>
                <Input
                    onChange={
                        (e) => {
                            setJson($ => ({...$, source: e.target.value}));
                        }
                    } />
                <Text>Type:</Text>
                <Select
                    placeholder="Select a type"
                    allowClear
                    onChange={
                        (e) => {
                            setJson($ => ({...$, type: e}))
                        }
                    }
                >
                    <Select.Option value="custom">Custom</Select.Option>
                    <Select.Option value="local">Local</Select.Option>
                    <Select.Option value="website">Website</Select.Option>
                    <Select.Option value="remote">Remote</Select.Option>

                </Select>
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

export default Sandbox;