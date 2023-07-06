import { Profile } from '@/ui/Profile';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import * as React from 'react';
import { DashboardWrapper } from '../dashboard/DashboardWrapper';

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <DashboardWrapper>
        <Profile />
      </DashboardWrapper>
    </>
  );
};
