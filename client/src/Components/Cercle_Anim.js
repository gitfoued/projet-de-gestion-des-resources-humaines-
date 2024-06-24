import React from 'react';

const   Cercle_Anim = () => {
    return (
        <div className="relative flex justify-center items-center h-[600px] ">
          <div className="circle-container">
            <div className="animated-circle"></div>
            <div className="animated-circle1 "></div>
            <div className="animated-circle2 "></div>
          </div>
          <style>
            {`
              .circle-container {
                position: relative;
                width: 450px;
                height: 450px;
              }
    
              .animated-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 2px solid yellow;
                border-radius: 50%;
                animation: animateCircles 2s ease-in-out infinite;
              }
              .animated-circle1 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 150px;
                height: 150px;
                border: 2px solid yellow;
                border-radius: 50%;
                animation: animateCircles 2s ease-in-out infinite;
              }
              .animated-circle2 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50px;
                height: 50px;
                border: 2px solid yellow;
                border-radius: 50%;
                animation: animateCircles 2s ease-in-out infinite;
              }
    
              @keyframes animateCircles {
                0%, 100% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 1;
                }
                50% {
                  transform: translate(-50%, -50%) scale(1.5);
                  opacity: 0;
                }
              }
            `}
          </style>
        </div>
      );
};

export default Cercle_Anim;
