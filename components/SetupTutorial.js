import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import Router from 'next/router';

const url =
  'https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials';

function SetupTutorial() {
  const [track, setTrack] = useState(false);

  function next() {
    Router.push({
      pathname: '/setup/configuration',
      query: { track },
    });
  }

  return (
    <div>
      <p className="text-center">
        To continue your setup, and get your credentials. <a href={url}>Follow the setup guide</a>{' '}
        in the documentation{' '}
      </p>

      <p className="text-center mt-5">
        <Checkbox onChange={e => setTrack(e.target.checked)}>
          I'm happy for you to track the version of Assistant Relay I use
        </Checkbox>
      </p>

      <div className="flex mt-6">
        <div className="mx-auto">
          <Button className="mx-1" href={url} target="_blank">
            Setup Guide
          </Button>
          <Button className="mx-1" type="primary" onClick={() => next()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SetupTutorial;
