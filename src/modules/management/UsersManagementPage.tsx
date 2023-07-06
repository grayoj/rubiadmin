import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { UserTable } from '@/ui/tables/UserTable';
import React from 'react';

interface UsersManagementPageProps {}

export const UsersManagementPage: React.FC<UsersManagementPageProps> = () => {
  return (
    <>
      <TopBar />
      <Sidebar />
      <UserTable />
    </>
  );
};
