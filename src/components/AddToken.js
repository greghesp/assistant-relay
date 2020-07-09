import { Button, message, Form, Input } from 'antd';
import axios from 'axios';
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

function AddToken({ user }) {
  async function addUser(values) {
    try {
      await axios.post(`/api/server/processOAuth`, {
        name: user,
        oauthCode: values.oauthcode,
      });

      Router.push({
        pathname: '/setup/authorisation',
        query: { name },
      });
    } catch (e) {
      message.error(e.response.data);
    }
  }

  return (
    <div>
      <p className="text-center">Paste your auth token from the Google Sign In window below</p>

      <div className="mt-5">
        <Form {...formItemLayout} onFinish={addUser}>
          <Form.Item
            label="Auth Code"
            name="oauthcode"
            rules={[
              {
                required: true,
                message: 'Please input your auth code',
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <div className="flex mt-5">
              <div className="mx-auto">
                <Button type="primary" htmlType="submit">
                  Finish
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddToken;
