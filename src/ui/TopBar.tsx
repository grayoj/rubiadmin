import { PersonCircle } from 'react-ionicons';
import React from 'react';
import Link from 'next/link';

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className='flex items-center justify-between px-4 py-3 bg-darkTheme text-white'>
      <h1 className='text-xl font-bold text-white mr-20'>Dashboard</h1>
      <div className='flex items-center space-x-8'>
        <div className='flex items-center space-x-2'></div>
        <Link href='/profile'>
          <PersonCircle
            style={{ cursor: 'pointer' }}
            color='white'
            height='24px'
            width='24px'
          />
        </Link>
      </div>
    </div>
  );
};
