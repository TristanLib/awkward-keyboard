import React from 'react';

const KeyboardKey = ({ ukChar, enChar, isPressed }) => (
  <div
    className={`
      relative w-12 h-12 border rounded flex flex-col items-center justify-center 
      transition-all duration-100 
      ${isPressed 
        ? 'bg-blue-200 transform translate-y-0.5 shadow-inner' 
        : 'bg-gray-100 shadow'}
    `}
  >
    <div className="text-lg font-medium">{ukChar}</div>
    <div className="text-xs text-gray-500 absolute bottom-1">{enChar}</div>
  </div>
);

const LanguageKeyboard = ({ layout, highlightKey }) => {
  return (
    <div className="flex flex-col gap-1">
      {layout.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.map((key, j) => (
            <KeyboardKey
              key={j}
              ukChar={key.target}
              enChar={key.source}
              isPressed={key.target === highlightKey}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LanguageKeyboard; 