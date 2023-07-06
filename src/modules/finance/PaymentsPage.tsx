import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { FinanceTable } from '@/ui/tables/FinanceTable';
import * as React from 'react';

interface PaymentsPageProps {}

export const PaymentsPage: React.FC<PaymentsPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <FinanceTable />
    </>
  );
};
