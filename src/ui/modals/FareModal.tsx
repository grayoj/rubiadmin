import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { dashboardUrl } from "@/libs/Constants";
import { Button } from "../buttons/Button";

interface FareModalProps {
  onClose: () => void;
}

export const FareModal: React.FC<FareModalProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueRate, setInputValueRate] = useState("");
  const [inputValueServiceFee, setInputValueServiceFee] = useState("");
  const [inputValueCommissionPercent, setInputValueCommissionPercent] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "amount") {
      setInputValue(e.target.value);
    } else if (e.target.name === "rate") {
      setInputValueRate(e.target.value);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${dashboardUrl}/api/user/users/fare/1`,
        {
          amount: inputValue,
          rate: inputValueRate,
          serviceFee: inputValueServiceFee,
          commissionPercent: inputValueCommissionPercent
          // Include inputValueRate in the PUT request
        },
      );
      toast.success("Fare updated successfully");
    } catch (error) {
      toast.error("Failed to update fare");
    }
    onClose();
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${dashboardUrl}/api/user/users/fare/save`,
        {
          amount: inputValue,
          rate: inputValueRate,
          serviceFee: inputValueServiceFee,
          commissionPercent: inputValueCommissionPercent
        },
      );
      toast.success("Fare Created successfully");
    } catch (error) {
      toast.error("Failed to created fare");
    }
    onClose();
  };

  return (
    <div className="bg-darkTheme p-8 rounded-lg">
      <input
        type="text"
        name="amount"
        value={inputValue}
        onChange={handleInputChange}
        className="px-3 py-1.5 rounded-md outline-none"
        placeholder="Enter Fare Amount"
      />
      <input
        type="text"
        name="rate"
        value={inputValueRate}
        onChange={handleInputChange}
        className="px-3 py-1.5 rounded-md outline-none"
        placeholder="Enter Rate Amount"
      />
      <input
        type="text"
        name="serviceFee"
        value={inputValueServiceFee}
        onChange={handleInputChange}
        className="px-3 py-1.5 rounded-md outline-none"
        placeholder="Enter Service Fee"
      />

      <input
        type="text"
        name="commissionPercent"
        value={inputValueCommissionPercent}
        onChange={handleInputChange}
        className="px-3 py-1.5 rounded-md outline-none"
        placeholder="Enter Commission Percent"
      />

      <div className="flex justify-between mt-4">
        <button
          disabled={false}
          onClick={onClose}
          className="flex justify-center rounded-md border border-transparent bg-productRed py-2 px-4 text-sm font-medium text-white shadow-sm hover:duration-300"
        >
          Close
        </button>
        <Button disabled={false} onClick={handleUpdate}>
          Update
        </Button>
      </div>
      <div className="flex justify-end my-2">
        <Button disabled={false} onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  );
};
