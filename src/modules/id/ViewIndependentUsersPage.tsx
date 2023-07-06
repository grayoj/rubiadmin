import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { ViewUsers } from '@/ui/id/ViewUsers';
import React from 'react';

interface ViewIndependentUsersPageProps {}

export const ViewIndependentUsersPage: React.FC<
  ViewIndependentUsersPageProps
> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <ViewUsers />
    </>
  );
};
