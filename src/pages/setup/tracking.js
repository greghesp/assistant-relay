import React from 'react';
import { Divider } from 'antd';

import SetupLayout from '~/src/layouts/Setup';
import SetupTutorial from '~/src/components/SetupTutorial';

function Setup() {
  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Setup Assistant Relay</h1>
        <Divider />
        <SetupTutorial />
      </div>
    </SetupLayout>
  );
}

export default Setup;
