import Dashboard from '~/src/layouts/Dashboard';
import ChangePassword from '../components/ChangePassword';
import UserAccounts from '../components/UserAccounts';
import React, { useEffect, useState } from 'react';
import { post } from '../helpers/api';
import withAuth from '~/src/helpers/withAuth';

import Router from 'next/router';
import Transition from '../helpers/Transition';
import ResponseBlock from '../components/ResponseBlock';

function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [gettingKey, setGettingKey] = useState(false);
  const [newKey, setNewUser] = useState();
  const [deletingUser, setDeletingUser] = useState(false);
  const [name, setUsername] = useState();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [oauthcode, setOauthcode] = useState();
  const [response, setResponse] = useState();
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const { data } = await post('/api/server/getUsers');
        setUsers(data.users);
        setLoading(false);
      } catch (e) {
        // TODO: Handle error
        await post('/api/server/writeLogs', {
          level: 'error',
          message: e.message,
          service: 'web',
          func: 'UserManagement - getUsers',
        });
      }
      setLoading(false);
    }
    getUsers();
  }, [deletingUser, newKey]);

  async function addUser(e) {
    e.preventDefault();
    setGettingKey(true);
    try {
      const response = await post(`/api/server/addUser`, {
        name,
      });
      const win = window.open(response.data.url, '_blank');
      win.focus();
      setShow(true);
    } catch (e) {
      // TODO: Handle error
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'UserManagement - addUser',
      });
      setResponse(e.response.data);
      setShowResponse(true);
    }
    setGettingKey(false);
  }

  async function submitAuthToken(e) {
    e.preventDefault();
    setGettingKey(true);
    try {
      await post(`/api/server/processOAuth`, {
        name: name,
        oauthCode: oauthcode,
      });
      setShow(false);
      // Modal

      setNewUser(name);
    } catch (e) {
      // TODO: Handle error
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'UserManagement - submitAuthToken',
      });
    }
    setGettingKey(false);
  }

  async function deleteUser(k) {
    try {
      await post('/api/server/deleteUser', { user: k });
      setDeletingUser(prevState => !prevState);
    } catch (e) {
      // TODO: Handle error
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'UserManagement - deleteUser',
      });
    }
  }

  function ModalPanel() {
    return (
      <Transition
        show={show}
        enter="transition ease-in-out duration-150"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div
            className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Enter Auth Code
                </h3>
                <div className="mt-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      id="oauthcode"
                      className="flex-1 form-input block w-full min-w-0 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      onChange={e => {
                        setOauthcode(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 ">
              <div className="flex w-full rounded-md shadow-sm space-x-4">
                <button
                  onClick={e => submitAuthToken(e)}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Submit
                </button>
                <button
                  onClick={e => {
                    deleteUser(name);
                    setShow(false);
                  }}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    );
  }

  if (loading) return null;

  return (
    <Dashboard title="User Management">
      <p className="mt-5">Manage your user accounts that Assistant Relay uses</p>
      <ResponseBlock response={response} show={showResponse} close={() => setShowResponse(false)} />
      <div className="bg-white rounded-lg shadow-lg p-5 mt-10">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Users</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <input
                  id="username"
                  placeholder="User Name"
                  className="flex-1 form-input block w-full min-w-0 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 mr-5"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
                <button
                  type="button"
                  onClick={e => addUser(e)}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700"
                >
                  Add New User
                </button>
              </span>
            </div>
          </div>
        </div>

        <UserAccounts accounts={users} deleteUser={k => deleteUser(k)} />
      </div>
      <ModalPanel />
    </Dashboard>
  );
}

export default withAuth(UserManagement);
