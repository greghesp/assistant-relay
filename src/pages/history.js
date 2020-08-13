import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { post } from '../helpers/api';

import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';

const HistoryRow = dynamic(() => import('../components/HistoryRow'), { ssr: false });

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHistory() {
      try {
        const r = await post('/api/server/getHistory');
        setHistory(r.data.responses);
        setLoading(false);
      } catch (e) {
        // TODO: Handle error
        await post('/api/server/writeLogs', {
          level: 'error',
          message: e.message,
          service: 'web',
          func: 'History - getHistory',
        });
      }
    }

    getHistory();
  }, []);

  function Responses() {
    if (history.length > 0) {
      return (
        <ul>
          {history.map((r, i) => {
            return <HistoryRow data={r} key={i} />;
          })}
        </ul>
      );
    }

    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-1/4 text-center">
          <img src="/images/undraw_empty_xct9.svg" alt="No History" />
        </div>
      </div>
    );
  }

  if (loading) return null;

  return (
    <Dashboard title="History">
      <div>
        <div className="bg-white rounded-lg shadow-lg p-5 mt-10">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent History</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <span className="inline-flex rounded-md shadow-sm">
                  <Link href="/sandbox">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700"
                    >
                      Ask Assistant
                    </button>
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div>
            <Responses />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default withAuth(History);
