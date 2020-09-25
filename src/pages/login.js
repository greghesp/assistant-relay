import React, { useState, useEffect } from 'react';

import LoginLayout from '~/src/layouts/Login';
import axios from 'axios';
import Router from 'next/router';
import { post } from '../helpers/api';
import Toast from '../components/Toast';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [toastData, setToastData] = useState({ show: false });

  function Error() {
    if (error) {
      return (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMsg}
        </p>
      );
    }
    return null;
  }

  async function sendRequest(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/user/login`, {
        password,
      });
      const token = response.data.token;
      await cookies.set('token', token);

      Router.push('/');
    } catch (e) {
      setToastData({ show: true, content: e.message, success: false });
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'Login - sendRequest',
      });
      setErrorMsg(e.message);
      setError(true);
    }
  }

  return (
    <LoginLayout>
      <Toast show={toastData.show} content={toastData.content} success={toastData.success} />
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <div className="border-gray-100 border-b pb-5">
          <h1 className="text-xl font-semibold">Login to Assistant Relay</h1>
        </div>
        <div className="pt-5">
          <p>Please login to Assistant Relay to access the Dashboard</p>
          <form>
            <div>
              <div>
                <div className="mt-6 sm:mt-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Password
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                        <input
                          id="password"
                          type="password"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          onChange={e => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                <Error />
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    onClick={e => sendRequest(e)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoginLayout>
  );
}

export default Login;
