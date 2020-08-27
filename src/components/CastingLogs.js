import SocketConnect from '../helpers/SocketContext';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';

function CastingLogs() {
  const io = useContext(SocketConnect);
  const [castLogs, setCastLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    io.emit('streamCastLogs');

    io.on('castLog', data => {
      if (loading) setLoading(false);
      setCastLogs($ => [
        ...$,
        {
          message: data.message,
          timestamp: moment(data.timestamp).format('D MMM, HH:mm'),
        },
      ]);
    });
  }, []);

  if (loading) return <span className="leading-5">Waiting for events...</span>;

  return (
    <>
      {castLogs.map(l => {
        return (
          <p>
            <span className="leading-5 font-medium text-blue-500 mr-5">[{l.timestamp}]</span>
            <span>{l.message}</span>
          </p>
        );
      })}
    </>
  );
}

export default CastingLogs;
