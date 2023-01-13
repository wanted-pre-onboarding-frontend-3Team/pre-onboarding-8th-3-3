import { useRecoilValue } from 'recoil';
import ResultWrapper from './components/ResultWrapper';
import SearchInput from './components/SearchInput';
import SickTitle from './components/SickTitle';
import { searchValueState } from './states/searchValueState';

const App = () => {
  const searchValue = useRecoilValue(searchValueState);

  return (
    <div>
      <SickTitle />
      <SearchInput />
      {searchValue !== '' && <ResultWrapper />}
    </div>
  );
};

export default App;
