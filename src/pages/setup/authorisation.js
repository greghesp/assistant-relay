import React from 'react';
import { useRouter } from 'next/router';

import SetupLayout from '~/src/layouts/Setup';

import AddToken from '~/src/components/AddToken';

function Authorisation() {
  const router = useRouter();

  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Provide Auth Token</h1>
        <div className="mt-6  border-t border-gray-200 pt-5">
          <AddToken user={router.query.name} />
        </div>
      </div>
    </SetupLayout>
  );
}

export default Authorisation;
