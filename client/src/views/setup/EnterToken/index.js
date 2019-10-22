import React from "react";
import { Typography, Button, message, Form, Input } from 'antd';
import * as Styles from './styles'
import {post} from '~/helpers/api'
import {withRouter} from 'react-router-dom'
const { Title, Paragraph } = Typography;

function AddSecrets({form, next, previous, name, done}) {
    function addUser(e){
        e.preventDefault();
        form.validateFields(async(err, values) => {
            if(!err) {
                try {
                    await post({
                        name: name,
                        oauthCode: values.oauthCode
                    }, 'processOAuth');
                    return done();
                } catch (e) {
                    message.error(e.message)
                }
            }
        })
    }

    return (
        <Styles.Container>
            <Title level={2}>Setting up your accounts</Title>
            <Paragraph>Now that you have the client secrets downloaded, you can import them into Assistant Relay below</Paragraph>

            <Form layout="inline" onSubmit={addUser}>
                <Form.Item label="Auth Code">
                    {form.getFieldDecorator('oauthCode', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your auth code!',
                                type: 'string',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                <Styles.Steps>
                    <Button.Group>
                        <Button onClick={() => previous()}>
                            Previous
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Finish
                        </Button>
                    </Button.Group>
                </Styles.Steps>

            </Form>
        </Styles.Container>
    )
}

export default withRouter(Form.create()(AddSecrets));