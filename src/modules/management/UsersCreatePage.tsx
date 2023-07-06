import { FormComponent } from '@/ui/FormComponent';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import * as React from 'react';

interface UsersCreatePageProps {}

export const UsersCreatePage: React.FC<UsersCreatePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <FormComponent />
    </>
  );
};
