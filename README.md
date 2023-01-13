# 프로젝트 소개

- 개발 기간: 2023.01.10 ~ 2023.01.13
- 개발 스택: TypeScript, React, Styled Components, Recoil
- 팀장: 안지웅
- 팀원: 이윤진, 박혜선, 최주은

### 배포

https://pre-onboarding-8th-3-3.vercel.app/

- .env.local

```
REACT_APP_BASE_URL=http://localhost:4000
```

### 실행 방법

1. 서버 가동

https://github.com/walking-sunset/assignment-api_8th

2. 프로젝트 시작

```
npm install
npm start
```

### 기능

검색창 구현 + 검색어 추천 기능 구현

### 문제 해결

- #### 캐싱

custom hook으로 따로 만들어 캐싱을 구현했습니다.
cacheStorage를 사용하여 url에 대한 데이터를 저장하였습니다.
해당 url의 데이터가 cacheStorage에 저장되어 있다면 저장소에서 데이터를 가져오고 아닌 경우, api 호출을 하는 방식으로 구현했습니다.

```typescript
// src/hooks/useCache.ts
const useCache = (keyword: string) => {
  const [cacheResult, setCacheResult] = useState<SickTypes[] | null>(null);
  useEffect(() => {
    if (keyword) {
      handleCache(keyword);
    }
  }, [keyword]);
  if (!keyword) return null;

  const handleCache = async (url: string) => {
    const encode = encodeURI(url);
    const cacheStorage = await caches.open('searchQuery');
    const cache = await cacheStorage.match(`sick?q=${encode}`);

    if (cache) {
      setCacheResult(await cache.json());
      return;
    }
    await fetch(`http://localhost:4000/sick?q=${url}`)
      .then((data) => {
        console.info('calling api');
        const clone = data.clone();
        cacheStorage.put(`sick?q=${encode}`, clone);
        setTimeout(() => {
          cacheStorage.delete(`sick?q=${encode}`);
        }, 30 * 1000);
        return data.json();
      })
      .then((data) => setCacheResult(data))
      .catch((err) => console.log(err));
  };
  return cacheResult;
};

export default useCache;
```

30초마다 캐시가 삭제되도록 구현은 했으나,
30초가 지나기 전에 새로고침을 하거나 창을 닫게되면 캐시스토리지의 특성상 기존의 값이 삭제가 되지 않게 됩니다.
이 때문에 캐시의 Response의 header에서 Date를 가져와 현재시간과 비교하여 오래된 경우는 삭제를 하려고 했으나, 존재하지 않아 이와 같은 방식은 사용하지 못했습니다

```typescript
// 캐시가 있을 떄 오래된 데이터를 삭제하기 위해 Date를 비교하려 했던 방식
const date = new Date(response.headers.get('date')); //<- 헤더에있는 시간 데이터를 가져오려 했음
```

캐시스토리지를 사용하는 방법 이외에 리코일을 사용하여 캐싱을 구현했습니다. 과제 조건에서 캐싱 기능이 포함되지 않은 것으로 제한되어 있기 때문에 리코일의 캐싱 기능을 사용하지 않고 캐싱을 구현했습니다.

```typescript
// cache/jueun2 branch src/states/cache.state.ts
import { atom } from 'recoil';
import { CacheType } from '../types/sick.type';

export const cacheState = atom<CacheType[]>({
  key: 'cacheState',
  default: [],
});
```

```typescript
// cache/jueun2 branch src/components/ResultWrapper.tsx
const [recommend, setRecommend] = useRecoilState(recommendState);
const searchValue = useRecoilValue(searchValueState);
const [cache, setCache] = useRecoilState(cacheState);

useEffect(() => {
  const cachedData = cache.filter((el) => el.keyword === searchValue)[0];
  if (cachedData) {
    setRecommend(cachedData.cacheList);
  } else {
    getRecommend(searchValue)
      .then((res: AxiosResponse) => {
        setRecommend(res.data as SickType[]);
        setCache([...cache, { keyword: searchValue, cacheList: res.data as SickType[] }]);
      })
      .catch(() => {
        // TODO: 에러 처리
      });
  }
}, [cache, searchValue, setCache, setRecommend]);
```

- #### 디바운스

useDebounce Hook을 만들어 디바운싱을 구현했습니다.

input value의 값이 변경될 때마다 setTimeout을 사용하여 지연 시키고,timerId를 저장하고 있다가 새로운 value가 들어올 경우 기존의 timer를 삭제합니다.

```typescript
useDebounce(value:string, delay:number) => string
```

Parameter

- value: 입력된 값(input value가 변경될 때마다 변경 됨)
- delay: 지연시킬 시간
  </br>

Return

- debounceValue: 디바운스 된 값

```typescript
// src/hooks/useDebounce.ts
const useDebounce = (value: string, delay: number = 200) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [value, delay]);

  return debounceValue;
};
```

- #### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

키보드 입력 시 onKeyDown 이벤트를 감지해 입력된 키가 화살표 또는 엔터키일 경우 검색어 이동 및 갱신 처리를 했습니다.

이때 input 창에 한글을 입력 후 화살표를 입력할 경우 onKeyDown 이벤트가 두 번 발생하는 문제가 발생했습니다.

이는 입력창에서 한글을 입력할 때 글자가 조합 중인지 조합이 끝났는지 확인할 수 없는 경우 발생하는 문제입니다.

따라서 이를 확인하는 프로퍼티인 `isComposing`을 사용해 문제를 해결했습니다.

```typescript
// src/components/SearchInput.tsx
const listIdxHandler = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.nativeEvent.isComposing) return; // isComposing이 true일 경우 바로 return
  if (e.key === 'ArrowUp') {
    setSearchIdx((prev) => prev - 1);
  } else if (e.key === 'ArrowDown') {
    setSearchIdx((prev) => prev + 1);
  } else if (e.key === 'Backspace') {
    setSick([]);
  } else if (e.key === 'Enter' && sick[searchIdx]) {
    setSearchValue(sick[searchIdx].sickNm);
    setSearchIdx(0);
  } else {
    setSearchIdx(0);
  }
};
```

# Commit Convention

| Tag Name  | Description                                                                                   |
| :-------: | :-------------------------------------------------------------------------------------------- |
|   Feat    | 새로운 기능을 추가                                                                            |
|    Fix    | 버그 수정                                                                                     |
|  Design   | CSS 등 사용자 UI 디자인 변경                                                                  |
| !BREAKING | CHANGE 커다란 API 변경의 경우                                                                 |
|  !HOTFIX  | 급하게 치명적인 버그를 고쳐야하는 경우                                                        |
|   Style   | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                                         |
| Refactor  | 프로덕션 코드 리팩토링                                                                        |
|  Comment  | 필요한 주석 추가 및 변경                                                                      |
|   Docs    | 문서 수정                                                                                     |
|   Test    | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음       |
|   Chore   | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
|  Rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                                            |
|  Remove   | 파일을 삭제하는 작업만 수행한 경우                                                            |
