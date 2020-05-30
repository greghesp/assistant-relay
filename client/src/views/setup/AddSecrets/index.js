import React, { useState} from "react";
import { Typography, Upload, Button, Icon, message, Form, Input } from 'antd';
import * as Styles from './styles'
import {post} from '~/helpers/api'

const { Title, Paragraph } = Typography;

function AddSecrets({form, next, previous}) {
    const [fileList, setFileList] = useState();
    const [fileData, setFileData] = useState();
    const fileReader = new FileReader();

    fileReader.onload = event => {
        setFileData(JSON.parse(event.target.result));
    };

    const props = {
        multiple: false,
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList)

        },
        beforeUpload: file => {
            setFileList($ => [file]);
            fileReader.readAsText(file);
            return false;
        },
        fileList,
    };

    async function addUser(values){
        try {
            if(fileData) {
                const response = await post({
                    name: values.name,
                    secret: fileData
                }, 'addUser');
                const win = window.open(response.data.url, '_blank');
                win.focus();
                return next(values.name);
            }
        } catch (e) {
            message.error(e.response.data)
        }
    }

    return (
        <Styles.Container>
            <Title level={3}>Setting up your account</Title>
            <Paragraph>With your client secrets, you can import them into Assistant Relay below</Paragraph>

            <Form layout="inline" onFinish={addUser}>
                <Form.Item label="Users Name" name="name"
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input a users name!',
                                   type: 'string',
                               },
                           ]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                </Form.Item>

                <Styles.Steps>
                    <Button.Group>
                        <Button onClick={() => previous()}>
                            Previous
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Button.Group>
                </Styles.Steps>

            </Form>
        </Styles.Container>
    )
}

export default AddSecrets
