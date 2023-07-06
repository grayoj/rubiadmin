import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { MobileTable } from '@/ui/tables/MobileTable';
import React from 'react';

interface MobilePageProps {}

export const MobilePage: React.FC<MobilePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <MobileTable />
    </>
  );
};
