import { useState, useEffect } from 'react';

import SetupLayout from '~/src/layouts/Setup';
import { post } from '../../helpers/api';
import Router from 'next/router';

function Setup() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function CheckPassword() {
      try {
        const { data } = await post('/api/server/isPasswordDefault');
        if (!data) {
          return Router.push({
            pathname: '/setup/signup',
          });
        }
        setLoading(false);
      } catch (e) {
        // TODO: Handle error
        await post('/api/server/writeLogs', {
          level: 'error',
          message: e.message,
          service: 'web',
          func: 'Setup - CheckPassword',
        });
        setLoading(false);
      }
    }

    CheckPassword();
  }, []);

  useEffect(() => {
    if (password.length < 6 && password.length !== 0) {
      setError(true);
      setErrorMsg('Password must be more than 5 characters long');
    } else if (
      password !== repeatPassword &&
      password.length !== 0 &&
      repeatPassword.length !== 0
    ) {
      setError(true);
      setErrorMsg('Passwords do not match');
    } else if (repeatPassword.length === 0) {
      setError(true);
      setErrorMsg('Please re-enter your password');
    } else setError(false);
  }, [repeatPassword, password]);

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

  function Button() {
    if (error) {
      return (
        <button
          type="submit"
          disabled={true}
          className="opacity-50 inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out cursor-not-allowed"
        >
          Save
        </button>
      );
    }
    return (
      <button
        type="submit"
        onClick={e => sendRequest(e)}
        className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
      >
        Save
      </button>
    );
  }

  async function sendRequest(e) {
    e.preventDefault();
    try {
      await post(`/api/server/changePassword`, {
        password,
      });
      Router.push({
        pathname: '/setup/signup',
      });
    } catch (e) {
      // TODO: Handle error
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'Setup - sendRequest',
      });
    }
  }

  if (loading) return null;

  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <div className="border-gray-100 border-b pb-5">
          <h1 className="text-xl font-semibold">Setup Assistant Relay</h1>
        </div>
        <div className="pt-5">
          <p>
            Before you can setup Assistant Relay, you need to change the default password for the
            dashboard.
          </p>
          <p>Enter a password below to continue</p>
          <form>
            <div>
              <div>
                <div className="mt-6 sm:mt-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                    >
                      New Password
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

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Repeat Password
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                        <input
                          type="password"
                          id="passwordCheck"
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          onChange={e => {
                            setRepeatPassword(e.target.value);
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
                  <Button />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SetupLayout>
  );
}

export default Setup;
