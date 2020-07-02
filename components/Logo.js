// import logo from '~/assets/logo.png';

function Logo({ w }) {
  return (
    <div className="flex align-center justify-center">
      <div className={`w-${w}`}>
        <img className="object-contain" src="/images/logo.png" alt="Assistant Relay Logo" />
      </div>
    </div>
  );
}

export default Logo;
