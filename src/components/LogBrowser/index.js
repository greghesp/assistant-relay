import { useEffect, useState } from 'react';
import moment from 'moment';
import { post } from '../../helpers/api';
import Filters from './filters';

function LogBrowser() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [rowCount, setRowCount] = useState(10);
  const [order, setOrder] = useState('desc');
  const [logLevel, setLogLevel] = useState('all');
  const [serviceLevel, setServiceLevel] = useState('all');

  useEffect(() => {
    async function getLogs() {
      setLoading(true);
      try {
        const { data } = await post('/api/server/getLogs', {
          options: {
            limit: rowCount,
            order: order,
          },
          filters: {
            level: logLevel,
            service: serviceLevel,
          },
        });

        setLogs(data);
        setLoading(false);
      } catch (e) {
        // TODO:  Trigger UI Alert
        await post('/api/server/writeLogs', {
          level: 'error',
          message: e.message,
          service: 'web',
          func: 'LogBrowser - getLogs',
        });
      }
      setLoading(false);
    }

    getLogs();
  }, [rowCount, order, logLevel, serviceLevel]);

  function textClass(i) {
    switch (i) {
      case 'silly':
        return 'text-pink-400';
      case 'debug':
        return 'text-gray-400';
      case 'verbose':
        return 'text-green-400';
      case 'info':
        return 'text-teal-400';
      case 'warn':
        return 'text-orange-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }

  function serviceClass(i) {
    switch (i) {
      case 'server':
        return 'text-blue-400';
      case 'web':
        return 'text-purple-400';
      case 'assistant':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  }

  function Row(row) {
    return (
      <tr>
        <td
          className={`px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium ${textClass(
            row.level,
          )}`}
        >
          {row.level}
        </td>
        <td
          className={`px-6 py-4 whitespace-no-wrap text-sm leading-5 ${serviceClass(row.service)}`}
        >
          {row.service}
        </td>
        <td
          className={`px-6 py-4 whitespace-no-wrap text-sm leading-5 ${serviceClass(row.service)}`}
        >
          {row.func}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
          {row.message}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
          {moment(row.timestamp).format('MMM Do, HH:mm')}
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Filters
        rowCount={i => setRowCount(i)}
        logOrder={i => setOrder(i)}
        logLevel={i => setLogLevel(i)}
        serviceLevel={i => setServiceLevel(i)}
      />
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
                    Function
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
                {logs.length > 0 ? (
                  logs.map(r => {
                    return Row(r);
                  })
                ) : (
                  <tr>
                    <td
                      colspan="5"
                      className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center"
                    >
                      No Logs
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogBrowser;
