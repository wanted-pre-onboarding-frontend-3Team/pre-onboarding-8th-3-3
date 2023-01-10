import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { searchValueState } from '../states/searchValueState';
import { AiOutlineSearch } from 'react-icons/ai';
import useHighlight from '../hooks/use-highlight';

const ResultItem = ({ title }: { title: string }) => {
  const searchValue = useRecoilValue(searchValueState);

  return (
    <ItemWrapper>
      <AiOutlineSearch />
      <p>{useHighlight(title, searchValue)}</p>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  align-items: center;
  margin: 18px 0;

  p {
    margin-left: 10px;
  }

  span {
    font-weight: bold;
  }
`;

export default ResultItem;
