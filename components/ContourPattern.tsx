import React from 'react';

export const ContourPattern = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
      <div 
        className="absolute w-full h-full opacity-40"
        style={{
          backgroundImage: `url('/topography.svg')`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
};
