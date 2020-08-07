import { useRouter } from 'next/router';

import Link from 'next/link';

function NavBar() {
  const router = useRouter();
  const active = 'text-white bg-gray-900';
  const inActive = 'text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white';

  return (
    <nav className="mt-5 flex-1 px-2 bg-gray-800">
      <Link href="/">
        <a
          className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/' ? active : inActive
          }`}
        >
          <svg
            className="mr-3 h-6 w-6 text-gray-400 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </a>
      </Link>
      <Link href="/history">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/history' ? active : inActive
          }`}
        >
          <svg
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
          </svg>
          History
        </a>
      </Link>
      <Link href="/sandbox">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/sandbox' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
          </svg>
          Sandbox
        </a>
      </Link>
      <Link href="/casting">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/casting' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 172 172"
          >
            <path d="M0,172v-172h172v172z" fill="none" />
            <path d="M28.66667,21.5c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v21.5h14.33333v-21.5h114.66667v100.33333h-35.83333v14.33333h35.83333c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-100.33333c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM14.33333,71.66667v14.33333c35.70858,0 64.5,28.79142 64.5,64.5h14.33333c0,-43.45442 -35.37892,-78.83333 -78.83333,-78.83333zM14.33333,100.33333v14.33333c19.87794,0 35.83333,15.95539 35.83333,35.83333h14.33333c0,-27.62273 -22.54394,-50.16667 -50.16667,-50.16667zM14.33333,129v21.5h21.5c0,-11.87517 -9.62483,-21.5 -21.5,-21.5z" />
          </svg>
          Casting
        </a>
      </Link>
      <Link href="/access-control">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/access-control' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Access Control
        </a>
      </Link>
      <Link href="/settings">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/settings' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Settings
        </a>
      </Link>
      <Link href="/user-management">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/user-management' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
          </svg>
          User Management
        </a>
      </Link>

      <Link href="/logging">
        <a
          className={`mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
            router.route === '/logging' ? active : inActive
          }`}
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
              clipRule="evenodd"
            />
          </svg>
          Logging
        </a>
      </Link>
    </nav>
  );
}

export default NavBar;
