import { dashboardUrl } from '@/libs/Constants';
import { useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { financeSkeletonRows } from './TableSkeleton';
import { Button } from '../buttons/Button';
import { Status } from '../status/Status';
import Link from 'next/link';
import { Finance } from '@/types/FinanceTypes';

interface FinanceTableprops {}

export const FinanceTable: React.FC<FinanceTableprops> = () => {
  const queryClient = useQueryClient();
  const ref = React.useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(['finance', currentPage], () =>
    fetch(
      `${dashboardUrl}/api/delivery/finance/all?page=${currentPage}&size=10`
    )
      .then((response) => response.json())
      .then((data) => data)
  );

  const finance: Finance[] = data?.content ?? [];
  const pageCount: number = data?.totalPages ?? 0;
  const queryKey: QueryKey = ['finance', currentPage];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRetry = () => {
    queryClient.invalidateQueries(queryKey);
  };

  if (isError) {
    toast.error('Failed to fetch Finance Records', {
      autoClose: 2000,
    });
  }

  return (
    <main className='flex-1 xl:ml-64 bg-basicDark'>
      <div className='py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'></div>
        <div className='px-4 sm:px-6 lg:px-8 mt-7'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-white'>Finance</h1>
              <p className='mt-2 text-lg text-white'>
                Manage, View and Generate a Report of{' '}
                <strong>Financial Records</strong> on the Rubi Logistics
                platform.{' '}
                <Link href='/finance/payments/search'>
                  <u>Search for Records</u>
                </Link>
              </p>
            </div>
          </div>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-white ring-opacity-5 md:rounded-lg'>
                  <div ref={ref}>
                    {isLoading ? (
                      <table className='min-w-full divide-y divide-basicDark'>
                        <thead className='bg-darkTheme'>
                          <tr>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Payment ID
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Message
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Authorization Url
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Access Code
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Reference
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Rider Name
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Amount
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Currency
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Payment Status
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Customer Name
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Company Name
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Timestamp
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Channel
                            </th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-basicDark bg-darkTheme'>
                          {financeSkeletonRows}
                        </tbody>
                      </table>
                    ) : isError ? (
                      <div className='m-4 mx-auto flex flex-col items-center justify-center'>
                        <div className='text-white text-lg text-center mb-4'>
                          Unfortunately, we weren't able to fetch payments.
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
                                className='py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-white sm:pl-6'
                              >
                                Id
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Message
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Authorization Url
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Access Code
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Reference
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Rider Name
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Amount
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Currency
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Status
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Customer
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Company
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Timestamp
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Channel
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-basicDark bg-darkTheme'>
                            {data?.content?.map((finance: Finance) => (
                              <tr>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white cursor-pointer px-2 py-2 rounded-lg'>
                                        RUB{finance.id}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.message}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.authorizationUrl}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.accessCode}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.reference}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.delivery?.deliveryRider ? (
                                          <span>
                                            {finance.delivery.deliveryRider}
                                          </span>
                                        ) : (
                                          <span>Unassigned</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {finance.amount}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        NGN
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {finance.delivery?.paymentStatus ===
                                          'PAYMENT_FALIED' ? (
                                            <Status color='red'>Failed</Status>
                                          ) : (
                                            <Status color='green'>
                                              Success
                                            </Status>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {finance.delivery?.user.name ? (
                                            <span>
                                              {finance.delivery?.user.name}
                                            </span>
                                          ) : (
                                            <span>N/A</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {finance.delivery?.rider?.user
                                            .companyName ? (
                                            <span>
                                              {
                                                finance.delivery.rider?.user
                                                  .companyName
                                              }
                                            </span>
                                          ) : (
                                            <span>N/A</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {finance?.createdAt ? (
                                            <span>{finance?.createdAt}</span>
                                          ) : (
                                            <span>N/A</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {finance?.paymentType}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </>
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
                <div className='py-12'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
