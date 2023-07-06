import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import { PromoTable } from '@/ui/tables/PromosTable';
import * as React from 'react';

interface PromoCodesPageProps {}

export const PromoCodesPage: React.FC<PromoCodesPageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <PromoTable />
    </>
  );
};
