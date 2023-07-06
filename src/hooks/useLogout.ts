import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useLogout = () => {
 const router = useRouter();

 const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
 };

 const handleLogout = () => {
  toast.success('You have been logged out successfully!', {
   position: toast.POSITION.TOP_CENTER,
   autoClose: 2000,
  });
  logout();
 };

 useEffect(() => {
  return () => {
   // Cleanup function to remove the event listener when the component unmounts
   document.removeEventListener('click', handleLogout);
  };
 }, []);

 return handleLogout;
};

export default useLogout;