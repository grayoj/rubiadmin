import React, { ReactNode } from 'react';

interface FormButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled: false;
}

export const FormButton: React.FC<FormButtonProps> = ({ children }) => {
  return (
    <button className='flex w-full justify-center rounded-md border border-transparent bg-productGreen py-2 px-3 text-sm font-medium text-white shadow-sm hover:duration-300 hover:opacity-75'>
      {children}
    </button>
  );
};
