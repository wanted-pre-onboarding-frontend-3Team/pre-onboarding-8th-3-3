import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { ChangeEvent, useState, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { sickCacheSelector, sickState } from '../states/sickState';
import { SickCacheItem } from '../types/sick.type';

const SearchInput = () => {
  const [cacheTable, setCacheTable] = useRecoilState(sickCacheSelector);
  const setSickState = useSetRecoilState(sickState);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const searchSickHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }

      const newTimerId = setTimeout(async () => {
        const keyword = e.target.value;

        if (keyword === '') {
          setSickState([]);
          return;
        }

        const typedCacheTable = cacheTable as SickCacheItem[];
        const matchedSickData = typedCacheTable.find((sickData) => sickData.keyword === keyword);

        if (matchedSickData) {
          setCacheTable({ type: 'HIT', value: keyword });
        } else {
          console.info('calling api');

          const response = await axios.get(`http://localhost:4000/sick?q=${keyword}`);
          const { data } = response;

          setCacheTable({ type: 'NEW', value: { keyword, sickList: data, hit: 0 } });
        }
      }, 300);

      setTimerId(newTimerId);
    },
    [timerId, cacheTable],
  );

  return (
    <Container>
      <TextInputWrapper>
        <AiOutlineSearch />
        <TextInput onChange={searchSickHandler} type="text" placeholder="질환명을 입력해 주세요." />
      </TextInputWrapper>
      <SearchButton>
        <AiOutlineSearch />
      </SearchButton>
    </Container>
  );
};

const Container = styled.form`
  width: 490px;
  height: 74px;
  background: #fff;
  border-radius: 42px;
  margin: 40px auto 10px;
  padding: 0 8px 0 0;
  display: flex;
  align-items: center;
`;

const TextInputWrapper = styled.div`
  width: 430px;
  font-size: 18px;
  padding: 20px 10px 20px 24px;
  display: flex;
  align-items: center;
  font-weight: 400;

  svg {
    opacity: 0.5;
    font-size: 20px;
    margin-right: 10px;
  }
`;

const TextInput = styled.input`
  height: 23px;
  font-size: 18px;
  width: 100%;

  &::placeholder {
    font-size: 16px;
    opacity: 0.5;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: #007be9;
  border-radius: 100%;
  color: #fff;
  font-weight: 500;
  font-size: 26px;
`;

export default SearchInput;
