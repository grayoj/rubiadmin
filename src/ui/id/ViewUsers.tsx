import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Spinner } from '@/ui/Spinner';
import { Button } from '@/ui/buttons/Button';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { appUrl } from '@/libs/Constants';

interface ViewUsersProps {}

interface Delivery {
  id: string;
  pickupAddress: string;
  dropAddress: string;
  packageName: string;
  packageType: string;
  status: string;
  anount: string;
}

export const ViewUsers: React.FC<ViewUsersProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showTable, setShowTable] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery(['user', id], () =>
    fetch(`${appUrl}/user/users/${id}`).then((response) => response.json())
  );

  const {
    data: deliveries,
    isLoading: deliveriesLoading,
    refetch: refetchDeliveries,
  } = useQuery(['deliveries', id], () =>
    fetch(`${appUrl}/api/delivery/deliveries/user/${id}`).then((response) =>
      response.json()
    )
  );

  const handleShowTable = () => {
    setShowTable(true);
    refetchDeliveries();
  };

  const handleDeleteUser = (id: any) => {
    fetch(`${appUrl}/user/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          toast.error('Failed to delete user');
        }
        toast.success('User was deleted successfully.');
      })
      .catch((error) => console.error(error));
  };

  const ref = useRef<HTMLDivElement>(null);

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
                platform.
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'></div>
          </div>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div
                  ref={ref}
                  className='overflow-hidden shadow ring-1 ring-white ring-opacity-5 md:rounded-lg'
                >
                  {userLoading ? (
                    <div
                      className='text-white flex justify-center items-center
'
                    >
                      <Spinner />
                    </div>
                  ) : (
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
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-basicDark bg-darkTheme'>
                        <tr>
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
                                <div className='font-medium text-white'>
                                  Active
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
                <div className='mt-4 text-white flex font-bold'>
                  Available actions
                </div>
                <div className='py-12 flex'>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className='mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-productRed px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto'
                  >
                    Disable Account
                  </button>
                  <Button disabled={false} onClick={handleShowTable}>
                    Display Deliveries
                  </Button>
                </div>

                {userLoading ? (
                  <div
                    className='text-white flex justify-center items-center
'
                  >
                    <Spinner />
                  </div>
                ) : (
                  <div>
                    {showTable && deliveries.length > 0 && (
                      <>
                        <div className='mt-4 text-white'>
                          Deliveries made by {user?.name}
                        </div>
                        <table className='mt-6 min-w-full divide-y divide-basicDark'>
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
                                className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                              >
                                Pickup Address
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                              >
                                Dropoff Address
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                              >
                                Status
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                              >
                                Fare Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-basicDark bg-darkTheme'>
                            {deliveries &&
                              deliveries.map((delivery: Delivery) => (
                                <tr>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white cursor-pointer px-2 py-2 rounded-lg'>
                                          RUBLOG{delivery.id}
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
                                          {delivery.pickupAddress}
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
                                          {delivery.status}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                    <div className='flex items-center'>
                                      <div className='ml-1'>
                                        <div className='font-medium text-white'>
                                          null
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
