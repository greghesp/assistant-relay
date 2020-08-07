import React from 'react';
import { Divider } from 'antd';
import AddFirstUser from '~/src/components/AddFirstUser';
import SetupLayout from '~/src/layouts/Setup';

function Credentials() {
  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Install Credentials</h1>
        <Divider />
        <AddFirstUser />
      </div>
    </SetupLayout>
  );
}

export default Credentials;
