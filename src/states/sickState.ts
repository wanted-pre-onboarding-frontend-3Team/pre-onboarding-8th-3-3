import { atom, selectorFamily } from 'recoil';
import { CacheSickTypes, SickTypes } from '../types/sick.type';

// export const sickValue = atom<CacheSickTypes>({
//   key: 'sickValue',
//   default: {},
// });

export const sickState = atom<SickTypes[]>({
  key: 'sickState',
  default: [],
});

// export interface Cachemode {
//   [index: string]: CacheSickTypes | string;
//   mode: string;
//   data: CacheSickTypes | string;
// }
// export interface CacheData {
//   [index: string]: SickTypes[] | string;
//   mode: string;
//   data: SickTypes[] | string;
// }
// export const sickCacheState = selectorFamily<any | SickTypes[] | ((currVal: SickTypes[]) => SickTypes[]), string>({
//   key: 'sickCacheState',
//   get:
//     (param) =>
//     ({ get }) => {
//       const data = get(sickValue);
//       return data[param];
//     },
//   set:
//     (param) =>
//     ({ set, get }, value) => {
//       const prev = { ...get(sickValue) };
//       const { mode, data } = value;
//       if (mode === 'set') {
//         set(sickValue, { ...prev, [param]: data });
//       } else if (mode === 'delete') {
//         delete prev[data];
//         set(sickValue, prev);
//       }
//     },
// });
