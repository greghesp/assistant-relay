import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import {Button, InputNumber} from "antd";
import * as Styles from './styles';
import Text from "antd/es/typography/Text";


function Override({setReload}){
    const [port, setPort] = useState();

    useEffect(() => {
        localStorage.setItem('port', port);
    },[port]);


    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Port Number:</Text>
                <InputNumber onChange={(e) => setPort(e) } defaultValue={port} />
                <Button onClick={() => setReload()}>
                    Save
                </Button>
            </Styles.Form>
        </Styles.Container>)
}

export default withRouter(Override);