import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { appUrl } from '@/libs/Constants';
import { Button } from '../buttons/Button';

interface FareModalProps {
  onClose: () => void;
}

export const FareModal: React.FC<FareModalProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${appUrl}/api/update`, {
        data: inputValue,
      });
      toast.success('Content updated successfully');
    } catch (error) {
      toast.error('Failed to update fare');
    }
    onClose();
  };

  return (
    <div className='bg-darkTheme p-8 rounded-lg'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='px-3 py-1.5 rounded-md outline-none'
        placeholder='Enter Fare Amount'
      />

      <div className='flex justify-between mt-4'>
        <button
          disabled={false}
          onClick={onClose}
          className='flex justify-center rounded-md border border-transparent bg-productRed py-2 px-4 text-sm font-medium text-white shadow-sm hover:duration-300'
        >
          Close
        </button>
        <Button disabled={false} onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};
