import React from 'react';
import SetupLayout from '~/src/layouts/Setup';
import SetupTutorial from '~/src/components/SetupTutorial';

function Setup() {
  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 className="text-xl font-semibold">Setup Assistant Relay</h1>
        <div className="mt-6  border-t border-gray-200 pt-5">
          <SetupTutorial />
        </div>
      </div>
    </SetupLayout>
  );
}

export default Setup;
