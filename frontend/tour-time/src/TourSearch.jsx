import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CardPackages from './CardPackages';

const TourSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <CardPackages searchQuery={searchQuery} />
    </div>
  );
};

export default TourSearch;
