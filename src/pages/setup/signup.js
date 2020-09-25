import { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import SetupLayout from '~/src/layouts/Setup';
import { post } from '../../helpers/api';
import Router from 'next/router';

function SignUp() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  async function sendRequest(e) {
    e.preventDefault();
    try {
      await post(`/api/server/changePassword`, {
        password,
      });
      Router.push({
        pathname: '/setup/tracking',
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
          <MailchimpSubscribe
            url={'https://gmail.us2.list-manage.com/subscribe/post?u=a0998a875b6b9e8b2b8a362d1'}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={formData => subscribe(formData)}
              />
            )}
          />
        </div>
      </div>
    </SetupLayout>
  );
}

function CustomForm({ status, message, onValidated }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  function submit(e) {
    e.preventDefault();
    if (email && name && email.value.indexOf('@') > 1) {
      onValidated({
        EMAIL: email.value,
        NAME: name.value,
      });
    }
  }

  return (
    <div>
      <div>
        <div>
          <div className="mt-6 sm:mt-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    type="input"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Email
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    type="email"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={e => {
                      setEmail(e.target.value);
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
          <span className="ml-3 inline-flex">
            <button
              type="submit"
              onClick={e => skip(e)}
              className="inline-flex justify-center py-2 px-4 text-sm
              leading-5 font-medium
              transition duration-150 ease-in-out"
            >
              Skip
            </button>
          </span>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              onClick={e => submit(e)}
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
