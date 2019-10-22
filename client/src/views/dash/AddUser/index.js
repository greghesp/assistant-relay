import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import AddSecrets from '~/views/setup/AddSecrets';
import EnterToken from '~/views/setup/EnterToken';
import * as Styles from './styles';
import {Steps} from "antd";

function AddUser({history}){
    const [current, setCurrent] = useState(0);
    const [name, setName] = useState();

    const { Step } = Steps;

    function next() {
        const c = current + 1;
        setCurrent(c)
    }

    function prev() {
        const c = current - 1;
        setCurrent(c)
    }

    const steps = [
        {
            title: 'Adding Client Secret',
            content: <AddSecrets
                next={(name) => {
                    setName(name);
                    next();
                }}
                previous={() => prev()}
            />,
        },
        {
            title: 'Submit Token',
            content: <EnterToken
                name={name}
                done={() => history.push('/home')}/>,
        },
    ];

    return (
        <Styles.Container>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
        </Styles.Container>)
}

export default withRouter(AddUser);