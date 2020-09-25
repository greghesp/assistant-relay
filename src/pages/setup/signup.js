import { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import SetupLayout from '~/src/layouts/Setup';
import { post } from '../../helpers/api';
import Router from 'next/router';

function SignUp() {
  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <div className="border-gray-100 border-b pb-5">
          <h1 className="text-xl font-semibold">Our Mailing List</h1>
        </div>
        <div className="pt-5 text-sm">
          <p>Want to sign up to our mailing list? Just complete the form below.</p>
          <p>No spam, we promise.</p>
          <MailchimpSubscribe
            url="https://gmail.us2.list-manage.com/subscribe/post?u=a0998a875b6b9e8b2b8a362d1&amp;id=6b3bc05c1c"
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
    if (name && email) {
      onValidated({
        MERGE0: email,
        MERGE1: name,
      });
    }
  }

  function skip() {
    Router.push({
      pathname: '/setup/tracking',
    });
  }

  function StatusBlock() {
    if (!status) return null;
    if (status === 'sending') return <div className="text-blue-500">Sending...</div>;
    if (status === 'error')
      return <div className="text-red-500" dangerouslySetInnerHTML={{ __html: message }} />;
    if (status === 'success') {
    }
    return <div className="text-green-500" dangerouslySetInnerHTML={{ __html: message }} />;
  }

  if (status === 'success') skip();

  return (
    <div>
      <div>
        <div className="mt-5">
          <StatusBlock />
        </div>
        <div>
          <div className="mt-6 sm:mt-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="name"
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
                htmlFor="email"
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
      <div className="mt-6">
        <div className="flex justify-center">
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
