import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { searchValueState } from '../states/searchValueState';
import { AiOutlineSearch } from 'react-icons/ai';
import useHighlight from '../hooks/use-highlight';
import { ResultItemProps, StyledResultItemProps } from '../types/result.type';
import { sickIndexState } from '../states/sickState';

const ResultItem = ({ title, index }: ResultItemProps) => {
  const searchValue = useRecoilValue(searchValueState);
  const selectedIndex = useRecoilValue(sickIndexState);

  return (
    <ItemWrapper select={index === selectedIndex}>
      <AiOutlineSearch />
      <p>{useHighlight(title, searchValue)}</p>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li<StyledResultItemProps>`
  display: flex;
  align-items: center;
  margin: 0.5em;
  cursor: pointer;
  padding: 0.5em;
  background-color: ${(props) => props.select && '#dbeffc'};

  p {
    margin-left: 10px;
  }

  span {
    font-weight: bold;
  }
`;

export default ResultItem;
