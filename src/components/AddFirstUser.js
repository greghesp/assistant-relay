import React, { useState, useEffect } from 'react';

import { post } from '../helpers/api';
import Router from 'next/router';

function AddFirstUser() {
  const [name, setUsername] = useState();

  async function addUser(e) {
    e.preventDefault();
    try {
      const response = await post(`/api/server/addUser`, {
        name,
      });
      const win = window.open(response.data.url, '_blank');
      win.focus();
      await Router.push({
        pathname: '/setup/authorisation',
        query: { name },
      });
    } catch (e) {
      // TODO:  Trigger UI Alert
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'AddFirstUser - addUser',
      });
    }
  }

  return (
    <div>
      <p className="text-center">
        Add an Assistant Relay Username and upload your credentials from the previous step
      </p>

      <form>
        <div className="mt-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
          >
            Username
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
              <input
                id="username"
                className="flex-1 form-input block w-full min-w-0 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <span className="mt-5 inline-flex rounded-md shadow-sm">
              <button
                onClick={e => addUser(e)}
                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddFirstUser;
