import dynamic from 'next/dynamic';
import Transition from '../helpers/Transition';
import React, { useEffect, useState } from 'react';

const AudioPlayback = dynamic(() => import('./AudioPlayback'), { ssr: false });

function ResponseBlock({ response, show, close }) {
  let c = 'green';
  let icon = (
    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  if (!response) return null;

  if (!response.success) {
    c = 'red';
    icon = (
      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
    );
  }

  function TextBlock() {
    if (response?.response && response.response.length > 0) {
      return (
        <div className={`mt-2 text-sm leading-5 text-${c}-700`}>
          <AudioPlayback timestamp={response.timestamp} />
          <p>{response.response}</p>
        </div>
      );
    } else return null;
  }

  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`rounded-md bg-${c}-100 p-4 mt-5`}>
        <div className="flex">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <p className={`text-sm leading-5 font-medium text-${c}-800`}>
              {response?.success ? 'Request Successful' : 'Request Failed'}
            </p>
            <TextBlock />
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                className={`inline-flex rounded-md p-1.5 text-${c}-500 hover:bg-${c}-100 focus:outline-none focus:bg-${c}-100`}
                onClick={() => close()}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default ResponseBlock;
