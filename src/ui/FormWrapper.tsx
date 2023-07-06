import Link from 'next/link';

const FormHeader = (): JSX.Element => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='mx-auto h-12 w-auto'
        src='https://i.ibb.co/0GX70CY/Photo-from-Gray.jpg'
        alt='Rubi-Logistics'
      />
      <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-white'>
        Sign in to Admin
      </h2>
    </div>
  );
};

export default FormHeader;
