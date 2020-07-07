import React from 'react';
import { useRouter } from 'next/router';
import { Divider } from 'antd';

import SetupLayout from '~/src/layouts/Setup';

import AddToken from '~/src/components/AddToken';

function Authorisation() {
  const router = useRouter();

  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Provide Auth Token</h1>
        <Divider />
        <AddToken user={router.query.name} />
      </div>
    </SetupLayout>
  );
}

export default Authorisation;
