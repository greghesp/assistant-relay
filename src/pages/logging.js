import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';

function Logging() {
  return (
    <Dashboard title="Logs">
      <p>Settings</p>
    </Dashboard>
  );
}

export default withAuth(Logging);
