import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import isIP from 'is-ip';
import {Input, Button, InputNumber, message} from "antd";
import * as Styles from './styles';
import {Typography} from "antd";

const {Text, Title, Paragraph} = Typography;

function Override({setReload}){
    const [port, setPort] = useState();
    const [ip, setIp] = useState();

    useEffect(() => {
        localStorage.setItem('port', port);
        localStorage.setItem('ip', ip);

    },[port, ip]);

    function submit() {
        if(isIP(ip)) {
            setReload()
        } else message.error("Not a valid IP address");
    }


    return (
        <Styles.Container>
            <div>
                <Title level={3}>We need your server details</Title>
                <Paragraph>
                    Did you manually change your port or are you access this remotely?  Not to worry, add your server information below to continue
                </Paragraph>

                <Styles.Form>
                    <Text>IP Address:</Text>
                    <Input onChange={(e) => setIp(e.target.value)} defaultValue={ip} />

                    <Text>Port Number:</Text>
                    <InputNumber onChange={(e) => setPort(e)} defaultValue={port} />

                    <div></div>
                    <Button onClick={() => submit()} type={"primary"}>
                        Save
                    </Button>
                </Styles.Form>
            </div>
        </Styles.Container>)
}

export default withRouter(Override);