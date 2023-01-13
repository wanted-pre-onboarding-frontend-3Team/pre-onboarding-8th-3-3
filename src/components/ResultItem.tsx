import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchValueState } from '../states/searchValueState';
import { AiOutlineSearch } from 'react-icons/ai';
import useHighlight from '../hooks/use-highlight';

const ResultItem = ({ title, isSame }: { title: string; isSame: boolean }) => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  return (
    <ItemWrapper
      isSame={isSame}
      onClick={() => {
        setSearchValue(title);
      }}
    >
      <AiOutlineSearch />
      <p>{useHighlight(title, searchValue)}</p>
    </ItemWrapper>
  );
};
type ItemStyleType = {
  isSame: boolean;
};

const ItemWrapper = styled.li<ItemStyleType>`
  display: flex;
  align-items: center;
  padding: 9px 0;
  cursor: pointer;
  background-color: ${({ isSame }) => (isSame ? 'lightgray' : 'white')};
  border-radius: 5px;
  p {
    margin-left: 10px;
  }

  span {
    font-weight: bold;
  }
  :hover {
    background-color: lightgray;
  }
`;

export default ResultItem;
