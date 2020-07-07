import Logo from '~/src/components/Logo';
import LoadingAnimation from '../components/LoadingAnimation';
import LowFetcher from '../helpers/LowFetcher';
import Router from 'next/router';
import useSWR from 'swr';

function SetupLayout({ children }) {
  const { data, error } = useSWR('/api/getUsers', LowFetcher);

  if (!data) return <LoadingAnimation />;

  if (data.size >= 1) {
    Router.push('/');
  }

  return (
    <div className="w-screen h-screen setupBg bg-gray-200">
      <div className="bg-grey-400 flex items-center justify-center w-screen h-screen max-w-2xl mx-auto">
        <div className="h-auto">
          <Logo w="24" />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SetupLayout;
