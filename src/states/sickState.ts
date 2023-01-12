import { atom, selectorFamily } from 'recoil';
import { SickType } from '../types/sick.type';
import { getRecommend } from '../apis/search';

export const sickState = atom<SickType[]>({
  key: 'sickState',
  default: [],
});

export const sickSelector = selectorFamily<SickType[], { keyword: string }>({
  key: 'sickSelector',
  get:
    ({ keyword }: { keyword: string }) =>
    async () => {
      const response = await getRecommend(keyword);
      return response.data as SickType[];
    },
});
