import { StyledSearchDiv, StyledDeleteButton, StyledSearchInput, StyledSearchButton } from '../style/search';
import { SearchBarProps } from '../types/search.type';
import { TiDeleteOutline } from 'react-icons/ti';
import React from 'react';

const SearchBar = ({ setSearchWord }: SearchBarProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <StyledSearchDiv>
      <StyledSearchInput type="text" placeholder="질환명을 입력해 주세요." onChange={onChange} />
      <StyledDeleteButton>
        <TiDeleteOutline />
      </StyledDeleteButton>
      <StyledSearchButton>검색</StyledSearchButton>
    </StyledSearchDiv>
  );
};

export default SearchBar;
