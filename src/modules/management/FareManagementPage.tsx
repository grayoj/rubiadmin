import { Fare } from '@/ui/Fare';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import React from 'react';
import { DashboardWrapper } from '../dashboard/DashboardWrapper';

interface FareManagementPageProps {}

export const FareManagementPage: React.FC<FareManagementPageProps> = () => {
  return (
    <>
      <TopBar />
      <Sidebar />
      <DashboardWrapper>
        <Fare />
      </DashboardWrapper>
    </>
  );
};
