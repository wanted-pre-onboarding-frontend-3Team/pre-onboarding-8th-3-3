import { atom } from 'recoil';

export const focusIndexState = atom<number>({
  key: 'focusIndexState',
  default: -1,
});
