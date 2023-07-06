import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import React from 'react';
import { DashboardWrapper } from './DashboardWrapper';
import { DashboardCards } from './DashboardCards';
import { GloabalNotification } from '@/ui/modals/GloabalNotification';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <DashboardWrapper>
        <DashboardCards />
      </DashboardWrapper>
      <GloabalNotification />
    </>
  );
};
