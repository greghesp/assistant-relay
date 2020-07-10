import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { post } from '../helpers/api';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (newPassword.length < 6 && newPassword.length !== 0) {
      setError(true);
      setErrorMsg('Password must be more than 5 characters long');
    } else if (
      newPassword !== repeatPassword &&
      newPassword.length !== 0 &&
      repeatPassword.length !== 0
    ) {
      setError(true);
      setErrorMsg('Passwords do not match');
    } else if (repeatPassword.length === 0 && newPassword.length > 1) {
      setError(true);
      setErrorMsg('Please re-enter your password');
    } else setError(false);
  }, [repeatPassword, newPassword]);

  async function sendRequest(e) {
    e.preventDefault();
    try {
      await post(`/api/server/changePassword`, {
        password: newPassword,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  function Error() {
    if (error) {
      return (
        <p className="mt-2 text-sm text-red-600 mr-10" id="email-error">
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 mt-10">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="inline-flex rounded-md">
              <Error />
              <Link href="/sandbox">
                <Button />
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div>
        <form>
          <div className="sm:mt-5 lg:w-1/2 mx-auto">
            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="old_password"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Old Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    id="old_password"
                    required
                    type="password"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={e => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                New Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    id="password"
                    type="password"
                    required
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="repeat_password"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Repeat Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    id="repeat_password"
                    type="password"
                    required
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={e => setRepeatPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
