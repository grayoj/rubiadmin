import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Spinner } from '@/ui/Spinner';
import { Status } from '@/ui/status/Status';
import { appUrl, dashboardUrl } from '@/libs/Constants';

interface User {
  id: string;
  name: string;
}

interface Delivery {
  id: string;
  pickupAddress: string;
  dropAddress: string;
  packageName: string;
  packageType: string;
  status: string;
  anount: string;
}

interface ViewCorporateUsersProps {}

export const ViewCorporateUsers: React.FC<ViewCorporateUsersProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showTable, setShowTable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery(['user', id], () =>
    axios
      .get(`${appUrl}/api/user/users/${id}`)
      .then((response) => response.data)
  );

  const deleteUser = (id: string) => {
    axios
      .delete(`${appUrl}/api/user/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to delete user');
        }
      })
      .catch((error) => console.error(error));
  };

  const updateUserStatus = (id: string, status: string) => {
    axios
      .put(
        `${dashboardUrl}/api/user/users/${id}`,
        { status: status },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        toast.success('User status updated successfully', {});
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to update user status', {});
      });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleApprove = (id: string) => {
    updateUserStatus(id, 'APPROVED');
  };

  const handleNotApprove = (id: string) => {
    updateUserStatus(id, 'NOT_APPROVED');
  };

  return (
    <main className='flex-1 xl:ml-64 bg-basicDark'>
      <div className='py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-2'></div>
        <div className='px-4 sm:px-6 lg:px-8 mt-7'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-white'>
                Manage Corporate Customers
              </h1>
              <p className='mt-2 text-lg text-white'>
                Manage, Delete, View and Generate a Report of{' '}
                <strong>Corporate Accounts</strong> on the Rubi Logistics
                platform.{' '}
                <Link href='/customers/corporate/search'>
                  <u>Search for Corporate Users</u>
                </Link>
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <a
                href='/customers/corporate'
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-productGreen px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
              >
                Go Back
              </a>
            </div>
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
                            Account
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            Company Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Cac Number
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
                            No of Riders
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
                          <>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-1'>
                                  <div className='font-medium text-white'>
                                    {user?.status === 'NOT_APPROVED' ? (
                                      <Status color='red'>Not Approved</Status>
                                    ) : (
                                      <Status color='green'>Approved</Status>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
                <div className='mt-4 text-white font-bold'>
                  Available actions
                </div>
                <div className='pr-5 py-4'>
                  {user?.status === 'APPROVED' ? (
                    <button
                      onClick={() => handleNotApprove(user.id)}
                      className='mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-productYellow px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto'
                    >
                      Disable Account
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(user.id)}
                      className='mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-productYellow px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto'
                    >
                      Approve Account
                    </button>
                  )}
                </div>
                {userLoading ? (
                  <div
                    className='text-white flex justify-center items-center
'
                  >
                    <Spinner />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
