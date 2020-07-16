import React from 'react';
import Lottie from 'lottie-react-web';
import animation from '~/src/static/loading.json';

function LoadingAnimation() {
  return (
    <Lottie
      options={{
        animationData: animation,
      }}
    />
  );
}

export default LoadingAnimation;
