import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';
import LogBrowser from '../components/LogBrowser';

function Logging() {
  return (
    <Dashboard title="Logs">
      <div className="mt-10">
        <LogBrowser></LogBrowser>
      </div>
    </Dashboard>
  );
}

export default withAuth(Logging);
