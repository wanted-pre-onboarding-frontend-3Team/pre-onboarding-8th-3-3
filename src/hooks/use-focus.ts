import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { focusIndexState } from '../states/focusIndex.state';
import { searchValueState } from '../states/searchValue.state';
import { recommendState } from '../states/recommend.state';

export const useFocus = () => {
  const recommend = useRecoilValue(recommendState);
  const setSearchValue = useSetRecoilState(searchValueState);
  const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);
  const [inputValue, setInputValue] = useState('');

  const handleFocus = (e: React.KeyboardEvent<HTMLInputElement>): string => {
    if (e.nativeEvent.isComposing) return 'focus';

    if (e.key === 'ArrowDown' && focusIndex < recommend.length - 1) {
      setFocusIndex((prev) => prev + 1);
    } else if (e.key === 'ArrowUp' && focusIndex > 0) {
      setFocusIndex((prev) => prev - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusIndex === -1) return 'submit';
      setFocusIndex(-1);
      setInputValue(recommend[focusIndex].sickNm);
      setSearchValue(recommend[focusIndex].sickNm);
    }

    return 'focus';
  };
  return { inputValue, setInputValue, handleFocus };
};
