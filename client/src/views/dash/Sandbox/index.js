import React, {useEffect, useState} from "react";
import {Form, InputNumber, Switch, message, TimePicker} from "antd";
import * as Styles from './styles';


function Sandbox({form}){
    return (
        <Styles.Container>
            <div>Sandbox</div>
        </Styles.Container>)
}

export default Form.create()(Sandbox);