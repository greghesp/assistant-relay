import Logo from '~/src/components/Logo';
import LoadingAnimation from '../components/LoadingAnimation';
import Router from 'next/router';
import { post } from '../helpers/api';
import React, { useEffect, useState } from 'react';

function LoginLayout({ children }) {
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

export default LoginLayout;
