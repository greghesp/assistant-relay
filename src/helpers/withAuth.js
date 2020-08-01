import React, { Component } from 'react';
import { post } from './api';
import Router from 'next/router';
import LoadingAnimation from '../components/LoadingAnimation';

function withAuth(AuthComponent) {
  return class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        await post('/api/server/getConfig');
        this.setState({ loading: false, loggedIn: true });
      } catch (e) {
        console.log(e);
        if (e?.response?.status === 401) Router.push('/login');
      }
    }

    render() {
      if (this.state.loading)
        return (
          <div className="w-screen h-screen setupBg bg-gray-200">
            <div className="bg-grey-400 flex items-center justify-center w-screen h-screen max-w-2xl mx-auto">
              <div className="h-auto">
                <LoadingAnimation />
              </div>
            </div>
          </div>
        );

      return <AuthComponent />;
    }
  };
}

export default withAuth;
