import React, { useState, useEffect } from 'react';
import { post } from '../helpers/api';
import Router from 'next/router';

function AddSecrets({ track }) {
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    async function checkSecret() {
      try {
        const { data } = await post('/api/server/isSecretSetup');
        if (data) {
          return Router.push({
            pathname: '/setup/user',
          });
        }
        setLoading(false);
      } catch (e) {
        // TODO:  Trigger UI Alert
        await post('/api/server/writeLogs', {
          level: 'error',
          message: e.message,
          service: 'web',
          func: 'AddSecrets - checkSecret',
        });
        setLoading(false);
      }
    }

    checkSecret();
  }, []);

  const fileReader = new FileReader();

  async function addUser() {
    try {
      fileReader.readAsText(selectedFile);

      fileReader.onload = async event => {
        await post('/api/server/addSecret', {
          secret: JSON.parse(event.target.result),
        });

        Router.push({
          pathname: '/setup/user',
        });
      };
    } catch (e) {
      // TODO:  Trigger UI Alert
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'AddSecrets - addUser',
      });
    }
  }

  if (loading) return null;

  return (
    <div>
      <p className="text-center">
        Add your Google Developer Project credentials from the previous step
      </p>
      <div className="mt-5">
        <div className="mt-6 grid grid-cols-2 gap-4 items-center">
          <label className="block text-sm leading-5 font-medium text-gray-700 overflow-hidden">
            {selectedFile ? selectedFile.name : 'Credentials File'}
          </label>
          <div className="mt-2">
            <div className="flex items-center">
              <label
                className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700
                      hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
                      active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer"
              >
                <span>Upload</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={e => setSelectedFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6">
        <div className="mx-auto">
          <a
            href="https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials"
            target="_blank"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md  transition duration-150 ease-in-out"
          >
            Setup Guide
          </a>
          <button
            onClick={e => addUser(e)}
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

export default AddSecrets;
