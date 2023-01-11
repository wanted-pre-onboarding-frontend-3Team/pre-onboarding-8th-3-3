import { useState } from 'react';
import SearchBar from './SearchBar';

const Search = () => {
  const [searchWord, setSearchWord] = useState<string | null>(null);

  return (
    <>
      <SearchBar setSearchWord={setSearchWord} />;
    </>
  );
};

export default Search;
