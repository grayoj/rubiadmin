import React from 'react';

interface SearchIconProps {
  className?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ className }) => {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 ${className}`}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  );
};
