import React, { useState } from 'react';
import SetupLayout from '~/src/layouts/Setup';
import { post } from '../../helpers/api';
import Router from 'next/router';
import Toast from '../../components/Toast';

function Setup() {
  return (
    <SetupLayout>
      <h1 className="text-xl font-semibold">Setup Assistant Relay</h1>
      <div className="mt-6  border-t border-gray-200 pt-5">
        <SetupTutorial />
      </div>
    </SetupLayout>
  );
}

export default Setup;

const url =
  'https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials';

function SetupTutorial() {
  const [track, setTrack] = useState(true);
  const [toastData, setToastData] = useState({ show: false });

  async function next(e) {
    try {
      await post('/api/server/setTracking', {
        track: track,
      });

      Router.push({
        pathname: '/setup/credentials',
      });
    } catch (e) {
      setToastData({
        show: true,
        content: e.message,
        success: false,
      });
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'SetupTutorial - next',
      });
    }
  }

  return (
    <div>
      <Toast show={toastData.show} content={toastData.content} success={toastData.success} />
      <p className="text-center text-sm">
        To continue your setup, and get your credentials. <a href={url}>Follow the setup guide</a>{' '}
        in the documentation{' '}
      </p>

      <div className="relative flex items-center justify-center mt-5">
        <div className="flex items-center h-5">
          <input
            id="comments"
            type="checkbox"
            defaultChecked={track}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            onChange={e => setTrack(e.target.checked)}
          />
        </div>
        <div className="ml-3 text-sm leading-5">
          <p className="text-gray-500">
            I'm happy for you to track the version of Assistant Relay I use
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center mt-5">
        <div className="flex items-center h-5">
          <a
            href="https://www.facebook.com/assistantrelay"
            target="_blank"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4
            font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none
            focus:border-blue-900 focus:shadow-outline-blue active:bg-blue-900 transition ease-in-out duration-150"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Like our Facebook Page
          </a>
        </div>
      </div>

      <div className="flex mt-6">
        <div className="mx-auto">
          <a
            href={url}
            target="_blank"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md  transition duration-150 ease-in-out"
          >
            Setup Guide
          </a>
          <button
            onClick={e => next(e)}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700
            focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ml-5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
