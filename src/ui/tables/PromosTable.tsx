import { adminUrl } from '@/libs/Constants';
import { useQueryClient, QueryKey, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { promoSkeletonRows } from './TableSkeleton';
import { Button } from '../buttons/Button';

export interface Codes {
  id: number;
  name: string;
  timestamp: string;
  status: string;
}

export const fetchPromoCodes = async (
  page: number
): Promise<{ content: Codes[]; totalPages: any }> => {
  const response = await fetch(
    `${adminUrl}/api/user/users?page=${page}&size=10`
  );
  const data = await response.json();
  return data;
};

interface PromoTableProps {}

export const PromoTable: React.FC<PromoTableProps> = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  // Get the query client instance
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['codes', currentPage];

  const { data, isLoading, isError } = useQuery<
    { content: Codes[]; totalPages: any },
    Error
  >(queryKey, () => fetchPromoCodes(currentPage));

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries(queryKey);
  };

  if (isError) {
    toast.error('Failed to fetch created promo codes.', {
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
                Manage Created Promo Codes
              </h1>
              <p className='mt-2 text-lg text-white'>
                View and Disable Promo Codes.
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <Link
                href='/management/codes/create'
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-productGreen px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
              >
                Create Promo Code
              </Link>
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
                          Promo Code ID
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Timestamp
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                        >
                          Status
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
                      {promoSkeletonRows}
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
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Code ID
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Timestamp
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Status
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
                        {data?.content?.map((code) => (
                          <tr key={code.id}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white cursor-pointer px-2 py-2 rounded-lg'>
                                    RUB{code.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {code.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {code.timestamp}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {code.status}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white bg-productRed py-1 px-2 rounded-md cursor-pointer'>
                                    Disable Code
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
