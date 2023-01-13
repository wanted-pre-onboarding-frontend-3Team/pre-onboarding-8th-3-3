import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getRecommend } from '../apis/search';
import { cacheState } from '../states/cache.state';
import { focusIndexState } from '../states/focusIndex.state';
import { searchValueState } from '../states/searchValue.state';
import { recommendState } from '../states/recommend.state';
import { SickType } from '../types/sick.type';
import ResultItem from './ResultItem';
import { AxiosResponse } from 'axios';

const ResultWrapper = () => {
  const [recommend, setRecommend] = useRecoilState(recommendState);
  const searchValue = useRecoilValue(searchValueState);
  const [cache, setCache] = useRecoilState(cacheState);
  const focusIndex = useRecoilValue(focusIndexState);

  useEffect(() => {
    const cachedData = cache.filter((el) => el.keyword === searchValue)[0];
    if (cachedData) {
      setRecommend(cachedData.cacheList);
    } else {
      getRecommend(searchValue)
        .then((res: AxiosResponse) => {
          setRecommend(res.data as SickType[]);
          setCache([...cache, { keyword: searchValue, cacheList: res.data as SickType[] }]);
        })
        .catch(() => {
          // TODO: 에러 처리
        });
    }
  }, [cache, searchValue, setCache, setRecommend]);

  return (
    <ResultList>
      {recommend.length > 0 && (
        <>
          <Recommend>추천 검색어</Recommend>
          {recommend.map((data, index) => (
            <ResultItem key={data.sickCd} title={data.sickNm} isFocus={index === focusIndex} />
          ))}
        </>
      )}
      {recommend.length <= 0 && (
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
