import React, { useState } from 'react';
import Router from 'next/router';
import { post } from '../helpers/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const url =
  'https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials';

function SetupTutorial() {
  const [track, setTrack] = useState(false);

  async function next(e) {
    try {
      Router.push({
        pathname: '/setup/credentials',
        query: { track },
      });
    } catch (e) {
      // TODO:  Trigger UI Alert
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
      <p className="text-center">
        To continue your setup, and get your credentials. <a href={url}>Follow the setup guide</a>{' '}
        in the documentation{' '}
      </p>

      <div className="relative flex items-center justify-center mt-5">
        <div className="flex items-center h-5">
          <input
            id="comments"
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            onChange={e => setTrack(e.target.checked)}
          />
        </div>
        <div className="ml-3 text-sm leading-5">
          <p className="text-gray-500">
            I'm happy for you to track the version of Assistant Relay I use
          </p>
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

export default SetupTutorial;
