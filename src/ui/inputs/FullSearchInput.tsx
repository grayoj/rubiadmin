import React, { ChangeEvent } from 'react';
import { SearchIcon } from '../icons/SearchIcon';

interface FullSearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FullSearchInput: React.FC<FullSearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className='relative'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Search using Reference Code'
        className='pl-10 pr-4 py-2 w-full border rounded-lg border-gray-400 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-200'
      />
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 focus:outline-none'>
        <SearchIcon />
      </div>
    </div>
  );
};
