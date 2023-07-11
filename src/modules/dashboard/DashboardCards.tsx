import React from "react";
import Link from "next/link";
import { Person } from "react-ionicons";
import { useQuery } from "@tanstack/react-query";
import { UsersIcon } from "@heroicons/react/24/solid";
import { dashboardUrl } from "@/libs/Constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DashboardCardProps {}

export const DashboardCards: React.FC<DashboardCardProps> = () => {
  const { data: totalUsers, isLoading: isLoadingUsers } = useQuery<number>(
    ["totalUsers"],
    async () => {
      const response = await fetch(
        `${dashboardUrl}/api/user/mobile/users/total`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total users");
      }
      const data = await response.json();
      return data;
    },
  );

  const { data: totalDashboardUsers, isLoading: isLoadingDashboardUsers } =
    useQuery<number>(["totalDashboardUsers"], async () => {
      const response = await fetch(`${dashboardUrl}/api/user/users/total`);
      if (!response.ok) {
        throw new Error("Failed to fetch total dashboard users");
      }
      const data = await response.json();
      return data;
    });

  const { data: totalDeliveries, isLoading: isLoadingDeliveries } = useQuery<
    number
  >(["totalDeliveries"], async () => {
    const response = await fetch(
      `${dashboardUrl}/api/delivery/deliveries/total`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch total deliveries");
    }
    const data = await response.json();
    return data.totalElements; // Extract totalElements from the response
  });
  return (
    <main className="flex-1 xl:ml-64 bg-basicDark mb-48">
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-indigo-700">
              <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block">Rubi Super Admin.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white">
                  Welcome to the Rubi Super Admin Dashboard, a management tool
                  for Rubi Logistics
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4">
              <h3 className="text-lg leading-6 font-medium text-white">
                Quick Overview
              </h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative bg-darkTheme pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    {isLoadingUsers
                      ? (
                        <div className="absolute bg-white animate-pulse rounded-md p-3">
                          <Person
                            //@ts-ignore
                            className="h-6 w-6 bg-white animate-pulse"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )
                      : (
                        <div className="absolute bg-productGreen rounded-md p-3">
                          <Person
                            //@ts-ignore
                            className="h-6 w-6 text-white"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    <div className="ml-16 text-sm font-medium text-white truncate">
                      {isLoadingUsers
                        ? (
                          <div className="bg-white animate-pulse w-20 h-2 mt-1">
                          </div>
                        )
                        : <p>Mobile Users</p>}
                    </div>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <div className="text-2xl font-semibold text-white">
                      {isLoadingUsers
                        ? (
                          <div className="bg-white animate-pulse w-10 my-4 h-2">
                          </div>
                        )
                        : (
                          totalUsers
                        )}
                    </div>
                    <p
                      className={classNames(
                        "ml-2 flex items-baseline text-sm font-semibold text-white",
                      )}
                    >
                      <span className="sr-only">by</span>
                    </p>
                    <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        {isLoadingUsers
                          ? (
                            <div className="bg-white animate-pulse w-10 my-4 h-2">
                            </div>
                          )
                          : (
                            <Link
                              href="/customers/mobile"
                              className="font-medium text-white hover:text-productGreen"
                            >
                              {" "}
                              See More
                            </Link>
                          )}
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="relative bg-darkTheme pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    {isLoadingDashboardUsers
                      ? (
                        <div className="absolute bg-white animate-pulse rounded-md p-3">
                          <UsersIcon
                            //@ts-ignore
                            className="h-6 w-6 bg-white animate-pulse"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )
                      : (
                        <div className="absolute bg-productGreen rounded-md p-3">
                          <UsersIcon
                            //@ts-ignore
                            className="h-6 w-6 text-white"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    <div className="ml-16 text-sm font-medium text-white truncate">
                      {isLoadingDashboardUsers
                        ? (
                          <div className="bg-white animate-pulse w-20 h-2 mt-1">
                          </div>
                        )
                        : <p>Corporate Users</p>}
                    </div>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <div className="text-2xl font-semibold text-white">
                      {isLoadingDashboardUsers
                        ? (
                          <div className="bg-white animate-pulse w-10 my-4 h-2">
                          </div>
                        )
                        : (
                          totalDashboardUsers
                        )}
                    </div>
                    <p
                      className={classNames(
                        "ml-2 flex items-baseline text-sm font-semibold text-white",
                      )}
                    >
                      <span className="sr-only">by</span>
                    </p>
                    <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        {isLoadingDashboardUsers
                          ? (
                            <div className="bg-white animate-pulse w-10 my-4 h-2">
                            </div>
                          )
                          : (
                            <Link
                              href="/customers/mobile"
                              className="font-medium text-white hover:text-productGreen"
                            >
                              {" "}
                              See More
                            </Link>
                          )}
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="relative bg-darkTheme pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    {isLoadingDeliveries
                      ? (
                        <div className="absolute bg-white animate-pulse rounded-md p-3">
                          <UsersIcon
                            //@ts-ignore
                            className="h-6 w-6 bg-white animate-pulse"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )
                      : (
                        <div className="absolute bg-productGreen rounded-md p-3">
                          <UsersIcon
                            //@ts-ignore
                            className="h-6 w-6 text-white"
                            color="white"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    <div className="ml-16 text-sm font-medium text-white truncate">
                      {isLoadingDeliveries
                        ? (
                          <div className="bg-white animate-pulse w-20 h-2 mt-1">
                          </div>
                        )
                        : <p>Deliveries</p>}
                    </div>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <div className="text-2xl font-semibold text-white">
                      {isLoadingDeliveries
                        ? (
                          <div className="bg-white animate-pulse w-10 my-4 h-2">
                          </div>
                        )
                        : (
                          totalDeliveries
                        )}
                    </div>
                    <p
                      className={classNames(
                        "ml-2 flex items-baseline text-sm font-semibold text-white",
                      )}
                    >
                      <span className="sr-only">by</span>
                    </p>
                    <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        {isLoadingDeliveries
                          ? (
                            <div className="bg-white animate-pulse w-10 my-4 h-2">
                            </div>
                          )
                          : (
                            <Link
                              href="/deliveries"
                              className="font-medium text-white hover:text-productGreen"
                            >
                              {" "}
                              See More
                            </Link>
                          )}
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
