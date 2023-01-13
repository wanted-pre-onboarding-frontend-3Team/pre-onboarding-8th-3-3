export interface SickTypes {
  [index: string]: string;
  sickCd: string;
  sickNm: string;
}

export interface CacheSickTypes {
  [index: string]: SickTypes[];
}

export interface Cachemode {
  mode: string;
  data: CacheSickTypes | string;
}
