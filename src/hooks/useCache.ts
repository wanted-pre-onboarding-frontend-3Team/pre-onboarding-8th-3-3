import { SickTypes } from '../types/sick.type';
import { useState, useEffect } from 'react';

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
        }, 60 * 1000);
        return data.json();
      })
      .then((data) => setCacheResult(data))
      .catch((err) => console.log(err));
  };
  return cacheResult;
};

// const handleCache = async (target: 'add' | 'match', url: string) => {
//   const cacheStorage = await caches.open('searchQuery');
//   if (target === 'add') {
//     const cache = await cacheStorage.add(url);
//     console.log(cache);
//     setTimeout(async () => {
//       await cacheStorage.delete(url);
//     }, 1000 * 60 * 30);
//     return cache;
//   }
//   if (target === 'match') {
//     const cache = await cacheStorage.match(url);
//     return cache;
//   }

//   return null;
// };

// if (cache) {
//   return cache;
// }
// caches.open('searchQuery').then((cache) => {
//   cache.add(`sick?q=${encode}`).then(() => {
//     axios
//       .get(`http://localhost:4000/sick?q=${url}`)
//       .then(({ data }) => data)
//       .then((data: SickTypes[]) => {
//         setCacheResult(data);
//         setTimeout(() => {
//           setCache({ mode: 'delete', url });
//         }, 1000 * 60 * 60);
//       });
//   });
// });
// const [cache, setCache] = useRecoilState(sickCacheState(url));
// axios
//   .get(`http://localhost:4000/sick?q=${url}`)
//   .then(({ data }) => data)
//   .then((data: SickTypes[]) => {
//     setCache({ mode: 'set', data });
//     setTimeout(() => {
//       setCache({ mode: 'delete', url });
//     }, 1000 * 60 * 60);
//   });

export default useCache;
