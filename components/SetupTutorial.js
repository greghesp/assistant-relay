import React from 'react';
import { Divider, Button } from 'antd';
import Router from 'next/router';

const url =
  'https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials';

function SetupTutorial() {
  function next() {
    Router.push({
      pathname: '/setup/configuration',
    });
  }

  return (
    <div>
      <p className="text-center">
        To continue your setup, and get your credentials. <a href={url}>Follow the setup guide</a>{' '}
        in the documentation{' '}
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
