import React, { Component } from 'react';

function routeRedirect(C) {
  return class Higher extends Component {
    static async getInitialProps(ctx) {
      console.log('GIP');
      await fetch('/api/getUsers');
    }

    render() {
      return <C {...this.props} secretToLife={42} />;
    }
  };
}

export default routeRedirect;
