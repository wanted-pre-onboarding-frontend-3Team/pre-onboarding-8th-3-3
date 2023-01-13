import { atom } from 'recoil';
import { CacheType } from '../types/sick.type';

export const cacheState = atom<CacheType[]>({
  key: 'cacheState',
  default: [],
});
