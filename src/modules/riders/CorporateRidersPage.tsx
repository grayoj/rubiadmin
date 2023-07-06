import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { CorporateRidersTable } from '@/ui/tables/CorporateRidersTable';
import * as React from 'react';

interface CorporateRidersPageProps {}

export const CorporateRidersPage: React.FC<CorporateRidersPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <CorporateRidersTable />
    </>
  );
};
