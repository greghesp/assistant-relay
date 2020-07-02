import React, { useState } from 'react';
import { Divider } from 'antd';

import SetupLayout from '~/layouts/Setup';

import SetupTutorial from '~/components/SetupTutorial';
import AddSecrets from '~/components/AddSecrets';
// import EnterToken from '~/views/setup/EnterToken';

function Setup({ getUserCount }) {
  const [current, setCurrent] = useState(0);
  const [name, setName] = useState();

  function next() {
    const c = current + 1;
    setCurrent(c);
  }

  function prev() {
    const c = current - 1;
    setCurrent(c);
  }

  return (
    <SetupLayout>
      <div className="bg-white rounded-lg border shadow-lg p-10">
        <h1 class="text-xl font-semibold">Setup Assistant Relay</h1>
        <Divider />
        <SetupTutorial />
      </div>
    </SetupLayout>
  );
}

export default Setup;
