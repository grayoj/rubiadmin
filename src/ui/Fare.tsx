import React, { useEffect, useState } from "react";
import { FareModal } from "./modals/FareModal";
import { Button } from "./buttons/Button";
import { dashboardUrl } from "@/libs/Constants";
import axios from "axios";
import { Spinner } from "./Spinner";

interface FareManagement {
  id: number;
  amount: string;
  timestamp: string;
  rate: string;
}

export const Fare: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fareManagement, setFareManagement] = useState<FareManagement | null>(
    null,
  );

  useEffect(() => {
    axios
      .get(`${dashboardUrl}/api/user/users/fare`)
      .then((response) => {
        setFareManagement(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Fare Management:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 xl:ml-24 bg-basicDark mb-48 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-semibold text-white">Fare Management</h1>
      </div>
      <div className="mx-2 my-24 rounded-xl border bg-darkTheme px-2 shadow-md sm:mx-auto sm:max-w-xs sm:px-8">
        <div className="mb-2 flex flex-col gap-y-6 border- py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <div className="w-56">
              <p className="text-white text-xl font-extrabold">
                Current Fare and Rate
              </p>
              <p className="text-white text-md">
                The current base fare on the mobile app
              </p>
            </div>
          </div>
        </div>
        <div className="mb-2 flex justify-between border-b border-darkTheme py-2 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            {fareManagement
              ? (
                <div>
                  <p className="text-white mb-1 text-md font-extrabold">
                    Fare: ₦{fareManagement?.amount}
                  </p>

                  <p className="text-white mb-1 text-md font-extrabold">
                    Rate: ₦{fareManagement?.rate}
                  </p>
                  <p className="text-white mb-1 text-md font-extrabold">
                    Updated At: {fareManagement?.timestamp}
                  </p>
                </div>
              )
              : (
                <div className="flex mx-auto items-center justify-center">
                  <Spinner />
                </div>
              )}
          </div>
        </div>
        <div className="my-8 mx-auto flex justify-center items-center">
          <Button onClick={handleOpenModal} disabled={false}>
            Update Fare
          </Button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 backdrop-filter backdrop-blur-sm">
            </div>
            <div className="relative ml-24">
              <div className="bg-darkTheme p-12 rounded-lg">
                <FareModal onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
