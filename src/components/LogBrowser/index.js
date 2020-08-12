import { useEffect, useState } from 'react';
import moment from 'moment';
import { post } from '../../helpers/api';
import Filters from './filters';

function LogBrowser() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [searchText, setSearchText] = useState();
  const [rowCount, setRowCount] = useState(10);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    async function getLogs() {
      try {
        setLoading(true);
        try {
          const { data } = await post('/api/server/getLogs', {
            options: {
              limit: rowCount,
              order: order,
            },
          });
          setLogs(data.file);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      } catch (e) {}
    }

    getLogs();
  }, [rowCount, order]);

  function Row(row) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
          {row.level}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
          {row.service}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
          {row.message}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
          {moment(row.timestamp).format('LLLL')}
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Filters rowCount={i => setRowCount(i)} logOrder={i => setOrder(i)} />
      <div className="flex flex-col rounded-lg shadow-lg">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map(r => {
                  return Row(r);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogBrowser;
