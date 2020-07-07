import React from 'react';
import dynamic from 'next/dynamic';
import { Divider } from 'antd';
import { useRouter } from 'next/router';

import SetupLayout from '~/src/layouts/Setup';

const AddSecrets = dynamic(() => import('~/src/components/AddSecrets'), { ssr: false });

function Configuration() {
  const router = useRouter();

  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Install Credentials</h1>
        <Divider />
        <AddSecrets track={router.query.track} />
      </div>
    </SetupLayout>
  );
}

export default Configuration;
