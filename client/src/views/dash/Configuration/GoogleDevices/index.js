import React, {useState, useEffect} from "react";
import isIP from 'is-ip';
import * as Styles from "../styles";
import {Button, Icon, Input, message} from "antd";

function GoogleDevices({devices, setDevices}) {
    const [name, setName] = useState();
    const [ip, setIP] = useState();


    function addDevice(){
        if(isIP(ip)) {
            setDevices($ => ([...$,{name, ip}]));
            setIP();
            return setName() ;
        }
        message.error("Not a valid IP address")
    }

    function removeDevice(d){
        setDevices(devices.filter($ => $.ip !== d.ip))
    }

    if(devices.length <= 0) {
        return (
            <Styles.Devices>
                <Input placeholder="Device Name" onChange={(e) => setName(e.target.value)}/>
                <Input placeholder="Device IP" onChange={(e) => setIP(e.target.value)}/>
                <Button onClick={() => addDevice()}>
                    <Icon type="plus" />
                </Button>
            </Styles.Devices>
        )
    }

    return (
        <Styles.Devices>
            {devices.map(d => {
                return (
                    <>
                        <Input value={d.name} disabled/>
                        <Input value={d.ip} disabled/>
                        <Button onClick={() => removeDevice(d)}>
                            <Icon type="minus" />
                        </Button>
                    </>
                )
            })}
            <Input placeholder="Device Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input placeholder="Device IP" value={ip} defaultValue={null} onChange={(e) => setIP(e.target.value)}/>
            <Button onClick={() => addDevice()}>
                <Icon type="plus" />
            </Button>
        </Styles.Devices>
    )
}

export default GoogleDevices