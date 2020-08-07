import React, { useState, useEffect } from 'react';
import { Upload, Button, Icon, message, Form, Input } from 'antd';
import { post } from '../helpers/api';
import Router from 'next/router';

const formItemLayout = {
  labelCol: {
    xs: { span: 26 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

function AddSecrets({ track }) {
  const [fileList, setFileList] = useState();
  const [fileData, setFileData] = useState();

  const fileReader = new FileReader();

  fileReader.onload = event => {
    setFileData(JSON.parse(event.target.result));
  };

  let props = {
    multiple: false,
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList($ => [file]);
      fileReader.readAsText(file);
      return false;
    },
    fileList,
  };

  async function addUser(values) {
    try {
      if (fileData) {
        await post('/api/server/addSecret', {
          secret: fileData,
        });
        await post('/api/server/setTracking', {
          track: track === 'true',
        });
        // const response = await post(`/api/server/addUser`, {
        //   name: values.name,
        // });
        Router.push({
          pathname: '/setup/user',
        });
        // const win = window.open(response.data.url, '_blank');
        // win.focus();
      }
    } catch (e) {
      console.log(e);
      //message.error(e.response.data);
    }
  }

  return (
    <div>
      <p className="text-center">
        Add your Google Developer Project credentials from the previous step
      </p>
      <div className="mt-5">
        <Form {...formItemLayout} onFinish={addUser}>
          <Form.Item label="Client Credentials" name="creds">
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <div className="flex mt-5">
              <div className="mx-auto">
                <Button
                  className="mx-1"
                  href="https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials"
                  target="_blank"
                >
                  Setup Guide
                </Button>
                <Button className="mx-1" type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddSecrets;
