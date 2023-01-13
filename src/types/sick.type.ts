export interface SickTypes {
  sickCd: string;
  sickNm: string;
}

export interface SickCacheItem {
  keyword: string;
  sickList: SickTypes[];
  hit: number;
}

export interface CachePayLoad {
  type: 'HIT' | 'NEW';
  value: string | SickCacheItem;
}
