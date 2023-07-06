import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import * as React from 'react';
import { DashboardWrapper } from '../dashboard/DashboardWrapper';
import { DeliveriesTable } from '@/ui/tables/DeliveriesTable';

interface DeliveriesPageProps {}

export const DeliveriesPage: React.FC<DeliveriesPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <DeliveriesTable />
    </>
  );
};
