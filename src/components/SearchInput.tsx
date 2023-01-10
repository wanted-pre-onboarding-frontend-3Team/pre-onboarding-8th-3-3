import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { sickState } from '../states/sickState';
import { searchValueState } from '../states/searchValueState';

const SearchInput = () => {
  const setSick = useSetRecoilState(sickState);
  const setSearchValue = useSetRecoilState(searchValueState);

  const searchSickHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await axios.get(`http://localhost:4000/sick?q=${e.target.value}`);
    const { data } = response;
    setSick(data);
    setSearchValue(e.target.value);
  };

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
