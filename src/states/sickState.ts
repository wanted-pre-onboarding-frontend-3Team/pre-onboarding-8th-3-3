import { atom, selector } from 'recoil';
import { CachePayLoad, SickCacheItem, SickTypes } from '../types/sick.type';
import { searchValueState } from './searchValueState';

export const sickState = atom<SickTypes[]>({
  key: 'sickState',
  default: [],
});

export const sickIndexState = atom<number>({
  key: 'sickIndexState',
  default: -1,
});

export const sickCacheTable = atom<SickCacheItem[]>({
  key: 'sickCasheTable',
  default: [],
});

export const sickCacheSelector = selector<SickCacheItem[] | CachePayLoad>({
  key: 'sickCacheSelector',
  get: ({ get }) => {
    return get(sickCacheTable);
  },
  set: ({ get, set }, newValue) => {
    let newCacheTable = get(sickCacheTable);
    const payLoad = newValue as CachePayLoad;

    if (payLoad.type === 'HIT') {
      newCacheTable = newCacheTable.map((cacheItem) => {
        if (cacheItem.keyword === payLoad.value) {
          set(sickState, cacheItem.sickList);
          set(searchValueState, cacheItem.keyword);

          return { ...cacheItem, hit: cacheItem.hit + 1 };
        }
        return cacheItem;
      });

      set(sickCacheTable, newCacheTable);
    } else {
      const newCacheItem = payLoad.value as SickCacheItem;

      set(sickCacheTable, [...newCacheTable, newCacheItem]);
      set(sickState, newCacheItem.sickList);
      set(searchValueState, newCacheItem.keyword);
    }

    set(sickIndexState, -1);
  },
});

export const sickIndexSelector = selector<number>({
  key: 'sickIndexSelector',
  get: ({ get }) => {
    return get(sickIndexState);
  },
  set: ({ get, set }, newValue) => {
    const plusIndex = newValue as number;
    const maxLength = get(sickState).length - 1;
    const currentIndex = get(sickIndexState);

    if (currentIndex + plusIndex <= maxLength && currentIndex + plusIndex >= 0) {
      set(sickIndexState, currentIndex + plusIndex);
    }
  },
});
