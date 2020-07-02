import Head from 'next/head';

import stylesheet from 'antd/dist/antd.min.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Assistant Relay</title>
        <meta charSet="utf-8" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
