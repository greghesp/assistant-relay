import { useState } from 'react';
import Transition from '../helpers/Transition';
import NavBar from '../components/NavBar';

function Dashboard({ children, title }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <Transition
            show={isOpen}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
          </Transition>
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button
                  className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src="/images/logo.svg" alt="Assistant Relay" />
                </div>
                <NavBar />
              </div>
              {/*<div className="flex-shrink-0 flex border-t border-gray-700 p-4">*/}
              {/*  <a href="#" className="flex-shrink-0 group block focus:outline-none">*/}
              {/*    <div className="flex items-center">*/}
              {/*      <div>*/}
              {/*        <img*/}
              {/*          className="inline-block h-10 w-10 rounded-full"*/}
              {/*          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
              {/*          alt=""*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*      <div className="ml-3">*/}
              {/*        <p className="text-base leading-6 font-medium text-white">Tom Cook</p>*/}
              {/*        <p className="text-sm leading-5 font-medium text-gray-300 group-hover:text-gray-100 group-focus:underline transition ease-in-out duration-150">*/}
              {/*          View profile*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </Transition>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      </div>

      {
        //  Static sidebar for desktop
      }
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-gray-800">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="/images/logo.svg" alt="Assistant Relay" />
              <span className="text-white ml-5 font-medium text-lg">Assistant Relay</span>
            </div>
            <NavBar />
          </div>
          <div className="flex-shrink-0 flex p-4">
            <p className="text-xs leading-4 font-medium text-center text-gray-300 group-hover:text-gray-100 transition ease-in-out duration-150">
              Copyright © 2020 Assistant Relay
            </p>
            {/*<a href="#" className="flex-shrink-0 w-full group block">*/}
            {/*  <div className="flex items-center">*/}
            {/*    <div>*/}
            {/*      <img*/}
            {/*        className="inline-block h-9 w-9 rounded-full"*/}
            {/*        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
            {/*        alt=""*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="ml-3">*/}
            {/*      <p className="text-sm leading-5 font-medium text-white">Tom Cook</p>*/}
            {/*      <p className="text-xs leading-4 font-medium text-gray-300 group-hover:text-gray-100 transition ease-in-out duration-150">*/}
            {/*        View profile*/}
            {/*      </p>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</a>*/}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main
          className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6"
          tabIndex="0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
