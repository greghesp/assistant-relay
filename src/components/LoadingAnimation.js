import React from 'react';
import Lottie from 'lottie-react-web';
import animation from '~/src/static/loading.json';

function LoadingAnimation() {
  return (
    <div className="w-screen h-screen setupBg bg-gray-200">
      <div className="bg-grey-400 flex items-center justify-center w-screen h-screen max-w-2xl mx-auto">
        <div className="h-auto">
          <Lottie
            options={{
              animationData: animation,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;
