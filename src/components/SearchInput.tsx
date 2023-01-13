import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { sickState } from '../states/sickState';
import { searchIdxState, searchValueState } from '../states/searchValueState';
import useDebounce from '../hooks/useDebounce';
import useCache from '../hooks/useCache';

const SearchInput = () => {
  const [sick, setSick] = useRecoilState(sickState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [searchIdx, setSearchIdx] = useRecoilState(searchIdxState);
  const debounce = useDebounce(searchValue);
  const cache = useCache(debounce);

  useEffect(() => {
    if (debounce && cache) {
      setSick(cache);
    }
    if (debounce === '') {
      setSick([]);
    }
  }, [debounce, setSick, cache]);
  const listIdxHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowUp') {
      setSearchIdx((prev) => prev - 1);
    } else if (e.key === 'ArrowDown') {
      setSearchIdx((prev) => prev + 1);
    } else if (e.key === 'Backspace') {
      setSick([]);
    } else if (e.key === 'Enter' && sick[searchIdx]) {
      setSearchValue(sick[searchIdx].sickNm);
      setSearchIdx(0);
    } else {
      setSearchIdx(0);
    }
  };
  return (
    <Container onKeyDown={listIdxHandler}>
      <TextInputWrapper>
        <AiOutlineSearch />
        <TextInput
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          type="text"
          placeholder="질환명을 입력해 주세요."
        />
      </TextInputWrapper>
      <SearchButton onClick={(e) => e.preventDefault()}>
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
