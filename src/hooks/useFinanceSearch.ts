import axios from 'axios';
import { useState } from 'react';
import { PaymentResponse } from '@/types/PaymentTypes';
import { toast } from 'react-toastify';
import { dashboardUrl } from '@/libs/Constants';

interface SearchOptions {
 fromDate: Date | null;
 toDate: Date | null;
 companyName: string;
}

interface SearchResults {
 paymentResponses: PaymentResponse[];
 totalPages: number;
}

export const useFinanceSearch = (): [
 SearchOptions,
 SearchResults,
 (options: SearchOptions) => void,
 () => void,
 (selected: { selected: number }) => void
] => {
 const [searchOptions, setSearchOptions] = useState<SearchOptions>({
  fromDate: null,
  toDate: null,
  companyName: '',
 });
 const [searchResults, setSearchResults] = useState<SearchResults>({
  paymentResponses: [],
  totalPages: 0,
 });
 const [currentPage, setCurrentPage] = useState(0);
 const [loading, setLoading] = useState(false);

 const handleSearch = () => {
  setLoading(true);

  // Format the dates as "YYYY-MM-DD" strings
  const fromDateString = searchOptions.fromDate?.toISOString().split('T')[0];
  const toDateString = searchOptions.toDate?.toISOString().split('T')[0];

  axios
   .get('http://localhost:9443/api/delivery/finance/search', {
    params: {
     fromDate: fromDateString,
     toDate: toDateString,
     companyName: searchOptions.companyName,
     page: currentPage,
     size: 10,
    },
   })
   .then(response => {
    setSearchResults({
     paymentResponses: response.data.content,
     totalPages: response.data.totalPages,
    });
   })
   .catch(error => {
    console.error('Error fetching payment responses:', error);
    toast.error('Failed', error);
   })
   .finally(() => {
    setLoading(false);
   });
 };

 const handlePageClick = (selected: { selected: number }) => {
  setCurrentPage(selected.selected);
 };

 return [searchOptions, searchResults, setSearchOptions, handleSearch, handlePageClick];
};
