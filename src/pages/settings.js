import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';

function Settings() {
  return (
    <Dashboard title="Settings">
      <p>Settings</p>
    </Dashboard>
  );
}

export default withAuth(Settings);
