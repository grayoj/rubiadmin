import * as React from 'react';
import { Button } from './buttons/Button';
import useLogout from '@/hooks/useLogout';
import { useGetAccount } from '@/hooks/useGetAccount';

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const logout = useLogout();
  const user = useGetAccount();

  return (
    <main className='flex-1 xl:ml-24 bg-basicDark mb-48 py-12'>
      <div className='mx-auto max-w-7xl pl-10 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-semibold text-white text-center'>
          Profile
        </h1>
      </div>
      <div className='mx-2 my-24 rounded-xl border bg-darkTheme px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8'>
        <div className='mb-2 flex flex-col gap-y-6 border-  py-8 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center'>
            <div className='ml-4 w-56'>
              <p className='text-white text-xl font-extrabold'>
                {user?.username}
              </p>
              <p className='text-white'>{user?.email}</p>
            </div>
          </div>
        </div>
        <div className='mb-2 flex justify-between border-b border-darkTheme py-8 text-sm sm:text-base'></div>
        <div className='flex justify-between py-8'>
          <Button onClick={logout} disabled={false}>
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
};
