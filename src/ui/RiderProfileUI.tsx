import React from 'react';
import { Button } from './buttons/Button';
import { useRouter } from 'next/router';
import { avatarUrl, dashboardUrl } from '@/libs/Constants';
import { QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

interface RiderProfileUIProps {}

export const fetchRiderById = async (id: number) => {
  const response = await fetch(`${dashboardUrl}/user/users/${id}`);
  const data = await response.json();
  return data;
};

export const RiderProfileUI: React.FC<RiderProfileUIProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: rider,
    isLoading,
    isError,
  } = useQuery<any, Error>(['rider', id], () => fetchRiderById(Number(id)));

  const navigate = async () => {
    router.push('/riders/corporate');
  };

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['rider', id];

  const handleRetry = () => {
    queryClient.invalidateQueries(queryKey);
  };

  if (isError) {
    return (
      <div className='py-10'>
        <div>
          <div className='m-4 mx-auto flex flex-col items-center justify-center'>
            <div className='text-white text-lg text-center mb-4'>
              We couldn't load that rider.
            </div>
            <div className='flex space-x-4'>
              <Button disabled={false} onClick={handleRetry}>
                Try Again
              </Button>
              <Button onClick={() => router.back()} disabled={false}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-200 py-8'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-darkTheme shadow py-10 overflow-hidden sm:rounded-lg'>
          <div className='px-4 sm:px-6'>
            <h3 className='text-lg leading-6 font-medium text-white'>
              Rider Profile Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-white'>
              View and edit your profile details.
            </p>
          </div>
          <div className='border-t border-gray-200'>
            <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <div className='flex items-center'>
                <img
                  className='w-16 h-16 rounded-full'
                  src={avatarUrl}
                  alt='Profile Thumbnail'
                />
                <div className='ml-4'>
                  <h4 className='text-lg font-medium text-white'>Name:</h4>
                  <p className='text-sm text-white'>Email:</p>
                </div>
              </div>
            </div>
          </div>
          <div className='px-5'>
            <p className='text-sm font-medium text-white'>Company Name:</p>
            <p className='text-sm font-medium text-white'>Username:</p>
            <p className='text-sm font-medium text-white'>Phone Number:</p>
            <p className='text-sm font-medium text-white'>Company Account:</p>
          </div>
          <div className='px-4 pt-4'>
            <Button onClick={navigate} disabled={false}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
