/**
 * 函数缓存。
 * @param fn 函数。
 * @return 缓存后函数。
 */
export const memo = <T extends Array<any>, R>(
  fn: (...args: T) => Exclude<R, Promise<any>>
) => {
  const cache = new Map();

  return (...args: T): R => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);

    cache.set(key, result);

    return result;
  };
};

/**
 * 函数缓存，用于异步函数。
 * @param fn 函数。
 * @returns 缓存后函数。
 */
export const asyncMemo = <T extends Array<any>, R>(
  fn: (...args: T) => Promise<R>
) => {
  const cache = new Map();

  return async (...args: T): Promise<R> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fn(...args);

    cache.set(key, result);

    return result;
  };
};
