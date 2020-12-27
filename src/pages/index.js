import Dashboard from '~/src/layouts/Dashboard';
import withAuth from '~/src/helpers/withAuth';
import LoadingAnimation from '../components/LoadingAnimation';

function Index() {
  return (
    <Dashboard title="Dashboard">
      <p>Hi v4</p>
    </Dashboard>
  );
}

export default withAuth(Index);
