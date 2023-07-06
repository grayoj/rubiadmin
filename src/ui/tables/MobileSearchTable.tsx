import { useQueryClient, QueryKey, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { User } from './MobileTable';
import Link from 'next/link';
import { appUrl } from '@/libs/Constants';
import { Spinner } from '../Spinner';
import { mobileSkeletonRows } from './TableSkeleton';
import { Button } from '../buttons/Button';
import { SearchInput } from '../inputs/SearchInput';

interface MobileSearchTableProps {}

export const MobileSearchTable: React.FC<MobileSearchTableProps> = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const fetchUsers = async (page: number) => {
    const response = await fetch(
      `${appUrl}/api/users?page=${page}&search=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  const filteredUsers = searchQuery
    ? data?.content.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.content;

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
                Search Mobile Customers
              </h1>
              <p className='mt-2 text-lg text-white'>
                Search Through <strong>Customer Accounts</strong> on the Rubi
                Logistics platform.{' '}
                <Link href='/customers/mobile'>
                  <u>Go Back</u>
                </Link>
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder='Search Mobile Accounts'
              />
            </div>
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
                                <Spinner />
                              </div>
                            ) : (
                              <b>Actions</b>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-basicDark bg-darkTheme'>
                        {filteredUsers?.map((user) => (
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
