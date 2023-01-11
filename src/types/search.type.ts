export type SearchBarProps = {
  setSearchWord: (newSearchWord: string) => void;
};

export type SearchListProps = {
  word: string;
  sickList: SearchedSick[];
};

export type SearchedSick = {
  sickCd: string;
  sickNm: string;
};
