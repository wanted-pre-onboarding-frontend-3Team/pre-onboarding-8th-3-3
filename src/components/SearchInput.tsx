import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { ChangeEvent, FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { searchValueState } from '../states/searchValue.state';
import { focusIndexState } from '../states/focusIndex.state';
import { useFocus } from '../hooks/use-focus';

const SearchInput = () => {
  const { inputValue, setInputValue, handleFocus } = useFocus();
  const setSearchValue = useSetRecoilState(searchValueState);
  const setFocusIndex = useSetRecoilState(focusIndexState);
  let timer: ReturnType<typeof setTimeout>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFocusIndex(-1);
    searchSick(e.target.value);
  };

  const searchSick = (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSearchValue(value);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const focusOrSubmit = handleFocus(e);
    if (focusOrSubmit === 'submit') handleSubmit(e);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <TextInputWrapper>
        <AiOutlineSearch />
        <TextInput
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={inputValue}
        />
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
