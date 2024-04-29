import React from 'react';

const TabButton = ({ onClick, isActive, icon, className, label }) => {
  const baseClasses = `rounded-full py-2 px-4 flex items-center font-medium focus:outline-none`;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses}
        ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
        ${className}`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default TabButton;
