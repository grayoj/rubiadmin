import { useSignupForm } from '@/hooks/useSignupForm';
import * as React from 'react';
import FormHeader from './FormWrapper';
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import { Spinner } from './Spinner';
import { FormButton } from './buttons/FormButton';
import Link from 'next/link';

interface FormComponent {}

export const FormComponent: React.FC<FormComponent> = () => {
  const { handleSubmit, formData, loading, errorMessage, handleChange } =
    useSignupForm();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <div className='flex min-h-full flex-col justify-center pb-12 sm:px-6 lg:px-8 items-center h-screen'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-xl font-bold tracking-tight text-white'>
            Create Admin Account
          </h2>
          <Link href='/management/users'>
            <h6 className='text-center text-md font-bold tracking-tight text-white'>
              <u>Go Back</u>
            </h6>
          </Link>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-darkTheme py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-white'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    name='username'
                    type='text'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-white'
                >
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    name='email'
                    type='email'
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-white'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <div className='relative flex items-center'>
                    <input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-4'
                    />
                    {showPassword ? (
                      <EyeIcon
                        type='button'
                        className='text-black mb-6 text-xs absolute right-2 top-1/2 transform -translate-y-full cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ width: '16px', height: '16px' }}
                      />
                    ) : (
                      <EyeSlashIcon
                        type='button'
                        className='text-black mb-6 text-xs absolute right-2 top-1/2 transform -translate-y-full cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ width: '16px', height: '16px' }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'></div>
              </div>
              <div>
                {loading ? (
                  <FormButton onClick={() => {}} disabled={false}>
                    <Spinner />
                  </FormButton>
                ) : (
                  <FormButton onClick={() => {}} disabled={false}>
                    Create Account
                  </FormButton>
                )}
              </div>
            </form>
            {errorMessage ? (
              <div className='bg-productRed border border-productRed text-white px-4 py-3 mt-4 rounded relative flex'>
                <div className='flex-grow'>{errorMessage}</div>
                <div className='flex items-center cursor-pointer'>
                  Help
                  <ArrowRightIcon className='h-5 w-5' />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
