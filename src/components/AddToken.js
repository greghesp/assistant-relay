import { post } from '../helpers/api';
import Router from 'next/router';
import React, { useState } from 'react';

function AddToken({ user }) {
  const [authCode, setAuthCode] = useState();

  async function addUser() {
    try {
      await post(`/api/server/processOAuth`, {
        name: user,
        oauthCode: authCode,
      });

      Router.push({
        pathname: '/',
      });
    } catch (e) {
      // TODO:  Trigger UI Alert
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'AddToken - addUser',
      });
    }
  }

  return (
    <div>
      <p className="text-center">Paste your auth token from the Google Sign In window below</p>

      <div className="mt-5">
        <div className="mt-6 grid grid-cols-2 gap-4 items-center">
          <label className="block text-sm leading-5 font-medium text-gray-700 overflow-hidden">
            Auth Code
          </label>
          <div className="mt-2">
            <div className="flex items-center">
              <input
                className="flex-1 form-input block w-full min-w-0 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                type="input"
                name="ouathcode"
                onChange={e => setAuthCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6">
        <div className="mx-auto">
          <button
            onClick={e => addUser(e)}
            className="inline-flex justify-right py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700
            focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ml-5"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToken;
