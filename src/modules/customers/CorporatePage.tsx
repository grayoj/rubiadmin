import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { CorporateTable } from '@/ui/tables/CorporateTable';
import React from 'react';

interface CorporatePageProps {}

export const CorporatePage: React.FC<CorporatePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <CorporateTable />
    </>
  );
};
