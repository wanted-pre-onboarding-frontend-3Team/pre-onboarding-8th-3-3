import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ResultWrapper from './components/ResultWrapper';
import SearchInput from './components/SearchInput';
import SickTitle from './components/SickTitle';
import { searchValueState } from './states/searchValueState';
import { sickIndexSelector } from './states/sickState';

const App = () => {
  const searchValue = useRecoilValue(searchValueState);
  const setSickIndex = useSetRecoilState(sickIndexSelector);

  useEffect(() => {
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      e.stopPropagation();

      if (e.key === 'ArrowDown') {
        // TODO:
        setSickIndex(1);
      } else if (e.key === 'ArrowUp') {
        // TODO:
        setSickIndex(-1);
      }
    });
  }, []);

  return (
    <>
      <SickTitle />
      <SearchInput />
      {searchValue !== '' && <ResultWrapper />}
    </>
  );
};

export default App;
