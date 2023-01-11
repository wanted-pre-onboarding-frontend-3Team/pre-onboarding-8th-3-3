import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyledSearchSection } from '../style/search';
import { SearchedSick } from '../types/search.type';
import SearchBar from './SearchBar';
import SearchedList from './SearchedList';

const Search = () => {
  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [sickList, setSickList] = useState<SearchedSick[]>([]);

  useEffect(() => {
    const getSearchWord = async () => {
      // FIX: 주소 env 파일에 빼기, api 호출 다른 함수로 빼야할지 고민해보기
      const response = await axios(`http://localhost:4000/sick?q=${searchWord}`);
      if (response.statusText === 'OK') {
        setSickList(response.data);
      }
    };

    getSearchWord();
  }, [searchWord]);

  return (
    <StyledSearchSection>
      <SearchBar setSearchWord={setSearchWord} />
      {searchWord && <SearchedList word={searchWord} sickList={sickList} />}
    </StyledSearchSection>
  );
};

export default Search;
