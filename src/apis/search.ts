import request from './base';

export const getRecommend = (keyword: string) => {
  return request({ url: `/sick?q=${keyword}` });
};
