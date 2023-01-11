import styled from 'styled-components';

const SickTitle = () => {
  return (
    <TitleContainer>
      <p>국내 모든 임상시험 검색하고</p> 온라인으로 참여하기
    </TitleContainer>
  );
};

const TitleContainer = styled.h2`
  width: 1040px;
  margin: 40px auto 0;
  font-size: 34px;
  font-weight: 700;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
`;

export default SickTitle;
