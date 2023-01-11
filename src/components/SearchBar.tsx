import { StyledSearchDiv, StyledDeleteButton, StyledSearchInput, StyledSearchButton } from '../style/search';
import { TiDeleteOutline } from 'react-icons/ti';

const SearchBar = () => {
  return (
    <StyledSearchDiv>
      <StyledSearchInput type="text" placeholder="질환명을 입력해 주세요." />
      <StyledDeleteButton>
        <TiDeleteOutline />
      </StyledDeleteButton>
      <StyledSearchButton>검색</StyledSearchButton>
    </StyledSearchDiv>
  );
};

export default SearchBar;
