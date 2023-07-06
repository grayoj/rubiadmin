import React, { ReactNode } from 'react';

type DashboardWrapperProps = {
  children: ReactNode;
};

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
}) => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4'>
      {children}
    </div>
  );
};
