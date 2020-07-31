import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';

function Casting() {
  return (
    <Dashboard title="Casting">
      <p>Casting</p>
    </Dashboard>
  );
}

export default withAuth(Casting);
