import { atom } from 'recoil';
import { SickType } from '../types/sick.type';

export const recommendState = atom<SickType[]>({
  key: 'recommendState',
  default: [],
});
