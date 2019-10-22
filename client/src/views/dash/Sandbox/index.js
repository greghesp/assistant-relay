import React, {useState} from "react";
import {Button, Input, Switch, Typography} from 'antd';
import * as Styles from './styles';

const {Text} = Typography;

function Sandbox() {
    const [json, setJson] = useState({command: "test", broadcast: true});
    return (
        <Styles.Container>
            <Styles.Form>
                <Text>Name:</Text>
                <Input  />
                <Text>Command:</Text>
                <Input  />
                <Text>Broadcast:</Text>
                <Styles.Switch>
                    <Switch checkedChildren="Yes"
                            unCheckedChildren="No"/>
                </Styles.Switch>
                <Text>JSON Data:</Text>
                <JSONData json={json}/>
                <Button type="primary">Submit</Button>
            </Styles.Form>
        </Styles.Container>
    )
}

function JSONData({json}) {
    return (
        <Styles.JsonBox>
            {JSON.stringify(json, undefined, 4)}
        </Styles.JsonBox>
    )
}

export default Sandbox;