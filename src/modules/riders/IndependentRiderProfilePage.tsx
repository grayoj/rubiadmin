import { IndependentRiderProfileUI } from '@/ui/IndependentRiderProfileUI';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import React from 'react';

interface RiderProfilePageProps {}

export const RiderProfilePage: React.FC<RiderProfilePageProps> = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <IndependentRiderProfileUI />
    </>
  );
};
