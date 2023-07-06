import { useSignupForm } from '@/hooks/useSignupForm';
import * as React from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import { Spinner } from './Spinner';
import { FormButton } from './buttons/FormButton';
import Link from 'next/link';

interface PromoComponentProps {}

export const PromoComponent: React.FC<PromoComponentProps> = () => {
  return (
    <>
      <div className='flex min-h-full flex-col justify-center pb-12 sm:px-6 lg:px-8 items-center h-screen'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-xl font-bold tracking-tight text-white'>
            Create A Promo Code
          </h2>
          <Link href='/management/users'>
            <h6 className='text-center text-md font-bold tracking-tight text-white'>
              <u>Go Back</u>
            </h6>
          </Link>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-darkTheme py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' method='POST'>
              <div>
                <label
                  htmlFor='code'
                  className='block text-sm font-medium text-white'
                >
                  Promo Code
                </label>
                <div className='mt-1'>
                  <input
                    name='code'
                    type='text'
                    placeholder='Enter a Code'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    required
                  />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'></div>
              </div>
              <div>
                <FormButton onClick={() => {}} disabled={false}>
                  Create Promo Code
                </FormButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
