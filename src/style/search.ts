import styled from 'styled-components';

export const StyledSearchSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledSearchDiv = styled.div`
  width: fit-content;
  background-color: white;
  border: 0.1em solid #c2c8ce;
  border-radius: 42px;
  padding: 0.6em;
  margin-bottom: 1em;
`;

export const StyledSearchInput = styled.input`
  width: 18em;
`;

export const StyledDeleteButton = styled.button`
  width: fit-content;
  height: fit-content;
  color: black;
  border-radius: 40px;
`;

export const StyledSearchButton = styled.button`
  background-color: #007be9;
  padding: 1.2em 1em;
  border-radius: 40px;
  color: white;
`;

export const StyledSearchedUl = styled.ul`
  width: 50%;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 2em;
`;

export const StyledSearchedLi = styled.li`
  padding: 0.5em;
`;

export const StyledBoldSpan = styled.span`
  font-weight: 700;
`;
