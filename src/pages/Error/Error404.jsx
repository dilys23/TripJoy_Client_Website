import React from 'react';
import imageJpg from '../../assets/images/404.png';

function Error404() {
    return (
        <div className="fixed  top-0 left-0 w-screen h-screen flex justify-center items-center bg-white overflow-hidden">
            <picture className="w-full h-full flex justify-center items-center">
                <img src={imageJpg} alt="404 Error" className="max-w-full max-h-full object-contain" />
            </picture>
        </div>
    );
}

export default Error404;
