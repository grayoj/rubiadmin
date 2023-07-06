import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { IndependentRidersTable } from '@/ui/tables/IndependentRidersTable';
import * as React from 'react';

interface IndependentRidersPageProps {}

export const IndependentRidersPage: React.FC<
  IndependentRidersPageProps
> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <IndependentRidersTable />
    </>
  );
};
