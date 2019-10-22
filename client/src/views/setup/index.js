import React, {useState} from "react";
import { Steps} from 'antd';

import GetJson from '~/views/setup/GetJson';
import AddSecrets from '~/views/setup/AddSecrets';
import EnterToken from '~/views/setup/EnterToken';

function SetupWiz({getUserCount}) {
    const [current, setCurrent] = useState(0);
    const [name, setName] = useState();

    const { Step } = Steps;

    const steps = [
        {
            title: 'Setting up your Project',
            content: <GetJson
                previous={() => prev()}
                next={() => next()}/>,
        },
        {
            title: 'Adding Client Secrets',
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
                done={() => getUserCount()}/>,
        },
    ];

    function next() {
        const c = current + 1;
        setCurrent(c)
    }

    function prev() {
        const c = current - 1;
        setCurrent(c)
    }

    return (
        <div>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
        </div>
    )
}


export default SetupWiz;