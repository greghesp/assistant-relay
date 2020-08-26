import SocketConnect from '../helpers/SocketContext';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';

function CastingLogs() {
  const io = useContext(SocketConnect);
  const [castLogs, setCastLogs] = useState([]);

  useEffect(() => {
    io.on('castLog', data => {
      const message = `[${moment(data.timestamp).format('D MMM, HH:mm')}] ${data.message}`;
      console.log(message);
      setCastLogs($ => [...$, message]);
    });
  }, []);

  return (
    <div>
      <textarea
        id="castLogs"
        readOnly
        rows="10"
        className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        value={castLogs}
      />
    </div>
  );
}

export default CastingLogs;
