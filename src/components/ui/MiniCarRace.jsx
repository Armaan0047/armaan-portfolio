import React from 'react';

const MiniCarRace = () => {
  return (
    <>
      {/* Car 1: Green Speedster */}
      <div className="absolute block" style={{ animation: 'drive-car 12s linear infinite', animationDelay: '0s', willChange: 'transform', left: 0 }}>
        <div className="mini-car mini-car-1">
          <div className="car-spoiler"></div>
          <div className="car-smoke car-smoke-1"></div>
          <div className="car-smoke car-smoke-2"></div>
          <div className="car-smoke car-smoke-3"></div>
          <div className="car-wheel wheel-back"></div>
          <div className="car-wheel wheel-front"></div>
        </div>
      </div>

      {/* Car 2: Purple Hypercar */}
      <div className="absolute block" style={{ animation: 'drive-car 12s linear infinite', animationDelay: '2.5s', willChange: 'transform', left: 0 }}>
        <div className="mini-car mini-car-2">
          <div className="car-spoiler"></div>
          <div className="car-smoke car-smoke-1"></div>
          <div className="car-smoke car-smoke-2"></div>
          <div className="car-smoke car-smoke-3"></div>
          <div className="car-wheel wheel-back"></div>
          <div className="car-wheel wheel-front"></div>
        </div>
      </div>

      {/* Car 3: Cyan Muscle Car */}
      <div className="absolute block" style={{ animation: 'drive-car 12s linear infinite', animationDelay: '6s', willChange: 'transform', left: 0 }}>
        <div className="mini-car mini-car-3">
          <div className="car-spoiler"></div>
          <div className="car-smoke car-smoke-1"></div>
          <div className="car-smoke car-smoke-2"></div>
          <div className="car-smoke car-smoke-3"></div>
          <div className="car-wheel wheel-back"></div>
          <div className="car-wheel wheel-front"></div>
        </div>
      </div>

      {/* Car 4: Orange Hot Rod */}
      <div className="absolute block" style={{ animation: 'drive-car 12s linear infinite', animationDelay: '9s', willChange: 'transform', left: 0 }}>
        <div className="mini-car mini-car-4">
          <div className="car-spoiler"></div>
          <div className="car-smoke car-smoke-1"></div>
          <div className="car-smoke car-smoke-2"></div>
          <div className="car-smoke car-smoke-3"></div>
          <div className="car-wheel wheel-back"></div>
          <div className="car-wheel wheel-front"></div>
        </div>
      </div>
    </>
  );
};

export default MiniCarRace;
