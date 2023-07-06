import { SearchScreen } from '@/ui/SearchScreen';
import { Sidebar } from '@/ui/Sidebar';
import { TopBar } from '@/ui/TopBar';
import * as React from 'react';

interface RecordSearchPageProps {}

export const RecordSearchPage: React.FC<RecordSearchPageProps> = () => {
  return (
    <>
      <TopBar />
      <Sidebar />
      <SearchScreen />
    </>
  );
};
