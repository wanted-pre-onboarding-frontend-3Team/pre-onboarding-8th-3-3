import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { searchValueState } from '../states/searchValue.state';
import { AiOutlineSearch } from 'react-icons/ai';
import useHighlight from '../hooks/use-highlight';

const ResultItem = ({ title, isFocus }: { title: string; isFocus: boolean }) => {
  const searchValue = useRecoilValue(searchValueState);

  return (
    <ItemWrapper isFocus={isFocus}>
      <AiOutlineSearch />
      <p>{useHighlight(title, searchValue)}</p>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li<{ isFocus: boolean }>`
  display: flex;
  align-items: center;
  margin: 18px 0;
  cursor: pointer;
  background-color: ${(props) => (props.isFocus ? '#f0f9ff' : '#fff')};

  p {
    margin-left: 10px;
  }

  span {
    font-weight: bold;
  }

  &:hover {
    background-color: #f0f9ff;
  }
`;

export default ResultItem;
