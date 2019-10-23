import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import {Button, InputNumber} from "antd";
import * as Styles from './styles';
import {Typography} from "antd";

const {Text, Title, Paragraph} = Typography;

function Override({setReload}){
    const [port, setPort] = useState();

    useEffect(() => {
        localStorage.setItem('port', port);
    },[port]);


    return (
        <Styles.Container>
            <div>
                <Title level={3}>Whoops! We lost your server connection</Title>
                <Paragraph>
                    Did you manually change your port?  Not to worry, add the port your server is using below to continue
                </Paragraph>

                <Styles.Form>
                    <Text>Port Number:</Text>
                    <InputNumber onChange={(e) => setPort(e) } defaultValue={port} />

                    <div></div>
                    <Button onClick={() => setReload()} type={"primary"}>
                        Save
                    </Button>
                </Styles.Form>
            </div>
        </Styles.Container>)
}

export default withRouter(Override);