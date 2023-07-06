import { appUrl } from '@/libs/Constants';
import { useQuery, QueryKey, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { deliveriesSkeletonRows } from './TableSkeleton';
import { Button } from '../buttons/Button';
import { Status } from '../status/Status';

interface Delivery {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  packageName: string;
  packageType: string;
  status: string;
  anount: string;
  deliveryRider: string;
}

interface DeliveriesTableprops {}

export const DeliveriesTable: React.FC<DeliveriesTableprops> = () => {
  const queryClient = useQueryClient();
  const ref = React.useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    ['deliveries', currentPage],
    () =>
      fetch(`${appUrl}/api/delivery/all?page=${currentPage}&size=10`)
        .then((response) => response.json())
        .then((data) => data)
  );

  const deliveries: Delivery[] = data?.content ?? [];
  const pageCount: number = data?.totalPages ?? 0;
  const queryKey: QueryKey = ['deliveries', currentPage];

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

  function handleEditClick(id: number) {
    router.push(`/view-delivery/${id}`);
  }
  return (
    <main className='flex-1 xl:ml-64 bg-basicDark'>
      <div className='py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'></div>
        <div className='px-4 sm:px-6 lg:px-8 mt-7'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-white'>Deliveries</h1>
              <p className='mt-2 text-lg text-white'>
                Here you can see details of current deliveries, and completed
                deliveries.
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
                              Package ID
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Dropoff Address
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Pickup Address
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Package Name
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Package Type
                            </th>
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                            >
                              Rider
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
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-basicDark bg-darkTheme'>
                          {deliveriesSkeletonRows}
                        </tbody>
                      </table>
                    ) : isError ? (
                      <div className='m-4 mx-auto flex flex-col items-center justify-center'>
                        <div className='text-white text-lg text-center mb-4'>
                          Unfortunately, we weren't able to fetch deliveries.
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
                                Package ID
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Dropoff Address
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Pickup Address
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Package Name
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Package Type
                              </th>
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                              >
                                Rider
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
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-basicDark bg-darkTheme'>
                            {data?.content.map((delivery: Delivery) => (
                              <tr>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white cursor-pointer px-2 py-2 rounded-lg'>
                                        RUB{delivery.id}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {delivery.dropAddress}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {delivery.pickupAddress}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {delivery.packageName}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {delivery.packageType}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='flex items-center'>
                                    <div className='ml-1'>
                                      <div className='font-medium text-white'>
                                        {delivery.deliveryRider}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          {delivery.status === 'CANCELLED' ? (
                                            <Status color='red'>
                                              Not Approved
                                            </Status>
                                          ) : delivery.status === 'PENDING' ||
                                            delivery.status ===
                                              'IN_PROGRESS' ? (
                                            <Status color='yellow'>
                                              Pending
                                            </Status>
                                          ) : delivery.status ===
                                            'DELIVERED' ? (
                                            <Status color='green'>
                                              Delivered
                                            </Status>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div
                                          className='font-medium text-white bg-productGreen py-1 px-2 rounded-md cursor-pointer'
                                          onClick={() =>
                                            handleEditClick(delivery.id)
                                          }
                                        >
                                          View
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
