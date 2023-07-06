import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { dashboardUrl } from '@/libs/Constants';
import { FullSearchInput } from './inputs/FullSearchInput';

interface SearchData {}

interface SearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery<SearchData>(
    ['searchData', searchQuery],
    async () => {
      const response = await fetch(
        `${dashboardUrl}/api/user/users/search-engine?query=${searchQuery}`
      );
      return response.json();
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: '/finance/record/view',
      query: { query: searchQuery, searchData: JSON.stringify(data) },
    });
  };

  return (
    <>
      <main className='flex-1 xl:ml-64 bg-basicDark'>
        <div className='py-48'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-2'></div>
          <div className='px-4 sm:px-6 lg:px-8 mt-7'>
            <div className='sm:flex sm:items-center'>
              <div className='sm:flex-auto'>
                <h1 className='text-xl font-semibold text-white'>
                  Payment Search
                </h1>
                <p className='mt-2 text-lg text-white'>
                  This module will search the entire system and provide the
                  result or close results. Search by Reference Code. Go back to{' '}
                  <u>
                    <a href='/finance/payments/search'>Normal Search.</a>
                  </u>
                </p>
                <div className='my-4'>
                  <form onSubmit={handleSubmit}>
                    <FullSearchInput
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type='submit'
                      className='text-white bg-productGreen py-2 px-2 rounded-md my-4'
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
