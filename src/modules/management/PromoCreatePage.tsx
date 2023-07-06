import { PromoComponent } from '@/ui/PromoComponent';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import React from 'react';

interface PromoCreatePageProps {}

export const PromoCreatePage: React.FC<PromoCreatePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <PromoComponent />
    </>
  );
};
