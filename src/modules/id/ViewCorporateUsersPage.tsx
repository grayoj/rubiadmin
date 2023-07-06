import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { ViewCorporateUsers } from '@/ui/id/ViewCorporateUsers';
import React from 'react';

interface ViewCorporateUsersPageProps {}

export const ViewCorporateUsersPage: React.FC<
  ViewCorporateUsersPageProps
> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <ViewCorporateUsers />
    </>
  );
};
