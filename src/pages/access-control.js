import Dashboard from '~/src/layouts/Dashboard';
import ChangePassword from '../components/ChangePassword';
import { useState } from 'react';
import { post } from '../helpers/api';

function AccessControl() {
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState();

  async function generateAPIKey(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await post(`/api/server/generateAPIKey`);
      setNewKey(r.data.key);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <Dashboard title="Access Control">
      <p className="mt-5">
        Here you can set API keys for the endpoints, as well as set a password for the dashboard
      </p>
      <p className="mt-1">
        If you're setting a API key because you plan to expose the endpoints publicly, it's highly
        recommended that you set a dashboard password to prevent the API keys being replaced or
        accessed.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-5 mt-10">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Access Keys</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={e => generateAPIKey(e)}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700"
                >
                  Add API Key
                </button>
              </span>
            </div>
          </div>
        </div>

        <div>No</div>
      </div>

      <ChangePassword />
    </Dashboard>
  );
}

export default AccessControl;
