import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { CorporateSearchTable } from '@/ui/tables/CorporateSearchTable';
import * as React from 'react';

interface CorporateSearchPageProps {}

export const CorporateSearchPage: React.FC<CorporateSearchPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <CorporateSearchTable />
    </>
  );
};
