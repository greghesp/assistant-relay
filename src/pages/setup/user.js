import React from 'react';
import AddFirstUser from '~/src/components/AddFirstUser';
import SetupLayout from '~/src/layouts/Setup';

function Credentials() {
  return (
    <SetupLayout>
      <h1 className="text-xl font-semibold">Install Credentials</h1>
      <div className="mt-6  border-t border-gray-200 pt-5">
        <AddFirstUser />
      </div>
    </SetupLayout>
  );
}

export default Credentials;
