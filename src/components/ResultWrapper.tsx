import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchValueState } from '../states/searchValueState';
import { sickState, sickSelector } from '../states/sickState';
import ResultItem from './ResultItem';

const ResultWrapper = () => {
  const [sick, setSick] = useRecoilState(sickState);
  const searchValue = useRecoilValue(searchValueState);
  const sickList = useRecoilValue(sickSelector({ keyword: searchValue }));

  useEffect(() => {
    setSick(sickList);
  }, [sickList, setSick]);

  return (
    <ResultList>
      {sick.length > 0 && (
        <>
          <Recommend>추천 검색어</Recommend>
          {sick.map((data) => (
            <ResultItem key={data.sickCd} title={data.sickNm} />
          ))}
        </>
      )}
      {sick.length <= 0 && (
        <EmptySearchWrapper>
          <p>검색어 없음</p>
        </EmptySearchWrapper>
      )}
    </ResultList>
  );
};

const ResultList = styled.ul`
  background: #fff;
  width: 490px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px;
`;

const Recommend = styled.p`
  font-size: 14px;
  opacity: 0.5;
  margin-bottom: 10px;
`;

const EmptySearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

export default ResultWrapper;
