import { atom } from 'recoil';
import { SickType } from '../types/sick.type';

export const sickState = atom<SickType[]>({
  key: 'sickState',
  default: [],
});
