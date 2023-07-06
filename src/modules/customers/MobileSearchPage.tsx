import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { MobileSearchTable } from '@/ui/tables/MobileSearchTable';
import * as React from 'react';

interface MobileSearchPageProps {}

export const MobileSearchPage: React.FC<MobileSearchPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <MobileSearchTable />
    </>
  );
};
