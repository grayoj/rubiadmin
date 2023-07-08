import { useQueryClient, QueryKey, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { dashboardUrl } from '@/libs/Constants';
import { dashboardSkeletonRows } from './TableSkeleton';
import { Button } from '../buttons/Button';
import { SearchInput } from '../inputs/SearchInput';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { Status } from '../status/Status';

interface CorporateSearchTableProps {}

export interface User {
  id: number;
  companyName: string;
  cacNumber: string;
  email: string;
  username: string;
  phone: string;
  riderNumber: string;
  status: string;
  streetAddress: string;
  accountNumber: string;
  bankName: string;
  companyState: string;
}

export const CorporateSearchTable: React.FC<CorporateSearchTableProps> = () => {
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
    router.push(`/customers/corporate/${id}`);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const fetchUsers = async (page: number) => {
    const response = await fetch(
      `${dashboardUrl}/api/user/users?page=${page}&size=10`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  const filteredUsers = searchQuery
    ? data?.content.filter((user) =>
        user.cacNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.content;

  if (isError) {
    toast.error('Failed to fetch Corporate Users', {
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
                Search Corporate Customers
              </h1>
              <p className='mt-2 text-lg text-white'>
                Search Through <strong>Corporate Accounts</strong> on the Rubi
                Logistics platform.{' '}
                <Link href='/customers/corporate'>
                  <u>Go Back</u>
                </Link>
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder='Search by CacNumber'
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
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Account
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Company Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          CAC Number
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
                          Company Mail
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Company State
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Street Address
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Rider No
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                        >
                          Account No
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                        >
                          Bank Name
                        </th>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-basicDark bg-darkTheme'>
                      {dashboardSkeletonRows}
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
                        {' '}
                        <tr>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Account
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Company Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            CAC Number
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Username
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Company Mail
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Company State
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Street Address
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Rider No
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Account No
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-center text-sm font-semibold text-white'
                          >
                            Bank Name
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            Actions
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
                                    {user.companyName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.cacNumber}
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
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.companyState}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.streetAddress}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.riderNumber}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.status === 'NOT_APPROVED' ? (
                                      <Status color='red'>Not Approved</Status>
                                    ) : (
                                      <Status color='green'>Approved</Status>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.accountNumber}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user.bankName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div
                                    className='font-medium text-white py-1 px-2 rounded-md cursor-pointer'
                                    onClick={() => handleEditClick(user.id)}
                                  >
                                    <ArrowUpRightIcon className='text-white h-4 w-4' />
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
