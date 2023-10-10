import React, { useState } from 'react';
import axios from 'axios';
import { adminUrl } from '@/libs/Constants';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export interface FormData {
 username: string;
 email: string;
 password: string;
}


export const useSignupForm = () => {
 const router = useRouter();
 const [step, setStep] = useState(1);
 const [loading, setLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const [formData, setFormData] = useState<FormData>({
  username: '',
  email: '',
  password: '',
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
 };

 const handleNextStep = () => {
  setStep((prevStep) => prevStep + 1);
 };

 const handlePrevStep = () => {
  setStep((prevStep) => prevStep - 1);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  setLoading(true);
  e.preventDefault();

  try {
   await axios.post(`${adminUrl}/api/auth/signup`, formData);
   console.log('Form submitted:', formData);
   toast.success("You have created an admin sucessfully.")
   router.push("/management/users/create")
  } catch (error: any) {
   console.error('Form submission error:', error);
   setErrorMessage(error.message);
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 };


 return {
  step,
  formData,
  handleChange,
  handleNextStep,
  handlePrevStep,
  handleSubmit,
  errorMessage,
  setErrorMessage,
  loading,
 };
};
