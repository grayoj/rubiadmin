import React from 'react';
import { BounceLoader, SyncLoader } from 'react-spinners';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <BounceLoader color='#97E398' size={50} />
    </div>
  );
};
