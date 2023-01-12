export interface SickType {
  sickCd: string;
  sickNm: string;
}

export interface CacheType {
  keyword: string;
  cacheList: SickType[];
}
