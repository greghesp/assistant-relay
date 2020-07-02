import Logo from '~/components/Logo';

function SetupLayout({ children }) {
  return (
    <div className="bg-grey-100 flex items-center justify-center w-screen h-screen max-w-2xl mx-auto">
      <div className="h-auto">
        <Logo w="24" />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default SetupLayout;
