import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../../assets/gif/loading.json';

const LoadingSpinner = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="loading-container flex flex-col">
            <Lottie options={defaultOptions} height={150} width={150} />
            {/* <span className='kanit-medium-italic text-[20px]'>Chờ một xí...</span> */}
        </div>
    );
};

export default LoadingSpinner;
