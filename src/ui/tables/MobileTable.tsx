import React, { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import { mobileSkeletonRows } from './TableSkeleton';
import { toast } from 'react-toastify';
import { Button } from '../buttons/Button';
import { appUrl } from '@/libs/Constants';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
}

export const fetchUsers = async (
  page: number
): Promise<{ content: User[]; totalPages: any }> => {
  const response = await fetch(`${appUrl}/user/users?page=${page}&size=10`);
  const data = await response.json();
  return data;
};

export const MobileTable: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Get the query client instance
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['users', currentPage];

  const { data, isLoading, isError } = useQuery<
    { content: User[]; totalPages: any },
    Error
  >(queryKey, () => fetchUsers(currentPage));

  const handleEditClick = (id: number) => {
    router.push(`/customers/mobile/${id}`);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries(queryKey);
  };

  if (isError) {
    toast.error('Failed to fetch Mobile Users', {
      autoClose: 2000,
    });
  }

  return (
    <main className='flex-1 xl:ml-64 bg-basicDark'>
      <div className='py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-2'></div>
        <div className='px-4 sm:px-6 lg:px-8 mt-7'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-white'>
                Manage Mobile Customers
              </h1>
              <p className='mt-2 text-lg text-white'>
                Manage, Delete, View and Generate a Report of{' '}
                <strong>Customer Accounts</strong> on the Rubi Logistics
                platform.{' '}
                <Link href='/customers/mobile/search'>
                  <u>Search for Users.</u>
                </Link>
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'></div>
          </div>
          <div className='-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 my-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div
                ref={ref}
                className='overflow-hidden shadow ring-1 ring-white ring-opacity-5 md:rounded-lg'
              >
                {isLoading ? (
                  <table className='min-w-full divide-y divide-basicDark'>
                    <thead className='bg-darkTheme'>
                      {' '}
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                        >
                          Account ID
                        </th>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                        >
                          Full Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Username
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Phone
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-basicDark bg-darkTheme'>
                      {mobileSkeletonRows}
                    </tbody>
                  </table>
                ) : isError ? (
                  <div className='m-4 mx-auto flex flex-col items-center justify-center'>
                    <div className='text-white text-lg text-center mb-4'>
                      Unfortunately, we weren't able to fetch your records.
                    </div>
                    <Button disabled={false} onClick={handleRetry}>
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <table className='min-w-full divide-y divide-basicDark'>
                      <thead className='bg-darkTheme'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            Account ID
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            Full Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Email
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Username
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Phone
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            {isLoading ? (
                              <div className='text-white'>
                                <svg
                                  className='animate-spin h-5 w-5 mr-3 ...'
                                  viewBox='0 0 24 24'
                                >
                                  <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                  ></circle>
                                  <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                  ></path>
                                </svg>
                              </div>
                            ) : (
                              <b>Actions</b>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-basicDark bg-darkTheme'>
                        {data?.content.map((user) => (
                          <tr key={user.id}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white cursor-pointer px-2 py-2 rounded-lg'>
                                    RUB{user.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.phone}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div
                                    className='font-medium text-white bg-productGreen py-1 px-2 rounded-md cursor-pointer'
                                    onClick={() => handleEditClick(user.id)}
                                  >
                                    View
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <ReactPaginate
                      pageCount={data?.totalPages}
                      onPageChange={handlePageClick}
                      containerClassName={'flex justify-center mt-4'}
                      activeClassName={'text-white mx-6'}
                      previousLinkClassName={'text-productGreen'}
                      nextLinkClassName={'text-productGreen'}
                      breakLinkClassName={'text-white'}
                      disabledClassName={'text-white cursor-not-allowed'}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
