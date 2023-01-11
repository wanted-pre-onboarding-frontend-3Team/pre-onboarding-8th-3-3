import { StyledBoldSpan, StyledSearchedUl, StyledSearchedLi } from '../style/search';
import { SearchListProps } from '../types/search.type';

const boldText = (text: string, searchWord: string) => {
  // FIX: lowercase 쓴 부분 수정 필요함
  if (searchWord !== '' && text.toLowerCase().includes(searchWord.toLowerCase())) {
    const parts = text.split(new RegExp(`(${searchWord})`, 'gi'));

    return (
      <>
        {parts.map((part, idx: number) =>
          part.toLowerCase() === searchWord.toLowerCase() ? <StyledBoldSpan key={idx}>{part}</StyledBoldSpan> : part,
        )}
      </>
    );
  }

  return text;
};

const SearchedList = ({ word, sickList }: SearchListProps) => {
  return (
    <StyledSearchedUl>
      {sickList.length === 0
        ? '검색어 없음'
        : sickList.map(({ sickCd, sickNm }) => (
            <StyledSearchedLi key={sickCd}>{boldText(sickNm, word)}</StyledSearchedLi>
          ))}
    </StyledSearchedUl>
  );
};

export default SearchedList;
