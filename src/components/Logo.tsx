import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-3"></div>
        <div className="absolute inset-0 bg-white rounded-lg border-2 border-blue-500 flex items-center justify-center transform -rotate-3 transition-transform hover:rotate-0">
          <span className="text-xl font-bold text-blue-500">别</span>
        </div>
      </div>
      <div className="text-2xl font-bold">别扭键盘</div>
    </div>
  );
};

export default Logo; 