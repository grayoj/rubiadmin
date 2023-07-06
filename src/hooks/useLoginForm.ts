import axios from 'axios';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { LoginResponse } from '../types/AuthInterfaces';
import { adminUrl } from '../libs/Constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


export const useLoginForm = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [progress, setProgress] = useState(0);

 const router = useRouter();


 useEffect(() => {
  const token = localStorage.getItem('user');
  if (token) {
   router.push('/');
  }
 }, [router]);

 const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUsername(e.target.value);
 };

 const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
 };

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setProgress(30);


  try {
   const response = await axios.post<LoginResponse>(`${adminUrl}/api/auth/signin`, {
    username,
    password,
   });
   if (response.data.accessToken) {
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data));
   }
   toast.success('Login successful!', { autoClose: 2000 });
   setProgress(100);
   setTimeout(() => {
    router.push('/dashboard');
   }, 3000);
  } catch (error: any) {
   setIsModalOpen(true);
   setProgress(0);
   toast.error('Login Unsuccessful. Try again.')
  } finally {
   setLoading(false);
  }
 };

 const closeModal = () => {
  setIsModalOpen(false);
 };

 return {
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  loading,
  errorMessage,
  isModalOpen,
  closeModal,
  progress,
  setProgress
 };
};

export default useLoginForm;