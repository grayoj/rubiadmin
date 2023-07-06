import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { FinanceSearchTable } from '@/ui/tables/FinanceTableSearch';
import * as React from 'react';

interface PaymentsSearchPageProps {}

export const PaymentsSearchPage: React.FC<PaymentsSearchPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <FinanceSearchTable />
    </>
  );
};
