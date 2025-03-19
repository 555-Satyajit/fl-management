import React from 'react';

export const Loader = () => {
  return React.createElement(
    'div',
    { className: "flex justify-center items-center py-10" },
    React.createElement('div', { className: "animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500" })
  );
};
