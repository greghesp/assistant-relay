import React, { useState } from 'react';
import { Divider } from 'antd';

import SetupLayout from '~/layouts/Setup';

import AddSecrets from '~/components/AddSecrets';

function Configuration({ getUserCount }) {
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
        <h1 class="text-xl font-semibold">Install Credentials</h1>
        <Divider />
        <AddSecrets />
      </div>
    </SetupLayout>
  );
}

export default Configuration;
