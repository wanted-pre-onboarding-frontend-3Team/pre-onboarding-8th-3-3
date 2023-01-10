import { atom, selector } from 'recoil';
import { SickTypes } from '../types/sick.type';

export const sickState = atom<SickTypes[]>({
  key: 'sickState',
  default: [],
});

// export const filteredSickState = atom<SickTypes[]>({
//   key: 'filteredSickState',
//   default: [],
// });

// export const sickSelector = selector({
//   key: 'sickSelector',
//   get: ({ get }) => {
//     const data = get(sickState);
//     return data;
//   },

//   set: ({ get, set }, value) => {
//     const data = get(sickState);

//     // @ts-ignore
//     if (value === '') set(filteredSickState, []);
//     else {
//       // @ts-ignore
//       const regExp = new RegExp(value, 'd');
//       const matchedSick = data.filter((sick) => sick.sickNm.match(regExp));
//       set(filteredSickState, matchedSick);
//     }
//   },
// });
