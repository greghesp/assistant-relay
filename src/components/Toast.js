import Transition from '../helpers/Transition';
import React, { useEffect, useState } from 'react';

const success_svg = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const fail_svg = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

function Toast({ show, icon, title, content, success, onClose }) {
  const [showToast, setShowToast] = useState();

  useEffect(() => {
    setShowToast(show);

    setTimeout(() => {
      console.log('hi');
      setShowToast(false);
    }, 5000);
  }, [show]);

  return (
    <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end ">
      <Transition
        show={showToast}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`max-w-sm w-full ${
            success ? `bg-green-400` : `bg-red-500`
          } shadow-lg rounded-lg pointer-events-auto`}
        >
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className={`flex-shrink-0 ${success ? `text-green-800` : `text-red-800`}`}>
                  {success ? success_svg : fail_svg}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm leading-5 font-medium text-white">
                    {title ? title : success ? 'Success' : 'Fail'}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-gray-100">{content}</p>
                  {/*<div className="mt-2">*/}
                  {/*  <button className="text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">*/}
                  {/*    Undo*/}
                  {/*  </button>*/}
                  {/*  <button className="ml-6 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150">*/}
                  {/*    Dismiss*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => onClose}
                    className={`inline-flex ${
                      success ? `text-green-800` : `text-red-800`
                    } focus:outline-none transition ease-in-out duration-150`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Toast;
