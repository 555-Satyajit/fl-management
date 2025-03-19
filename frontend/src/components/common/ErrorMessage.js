import React from 'react';

export const ErrorMessage = ({ message }) => {
  return React.createElement(
    'div',
    { 
      className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4",
      role: "alert"
    },
    React.createElement('strong', { className: "font-bold" }, "Error: "),
    React.createElement('span', { className: "block sm:inline" }, message)
  );
};