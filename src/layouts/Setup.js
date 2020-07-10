import Logo from '~/src/components/Logo';
import LoadingAnimation from '../components/LoadingAnimation';
import Router from 'next/router';
import { post } from '../helpers/api';
import { useEffect, useState } from 'react';

function SetupLayout({ children }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await post('/api/server/getUsers');
        console.log(response);
      } catch (e) {}
    }
  });

  // if (!data) return <LoadingAnimation />;
  //
  // if (data.size >= 1) {
  //   Router.push('/');
  // }

  return (
    <div className="w-screen h-screen setupBg bg-gray-200">
      <div className="bg-grey-400 flex items-center justify-center w-screen h-screen max-w-2xl mx-auto">
        <div className="h-auto">
          <Logo w="24" />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SetupLayout;
