import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default <T extends (...args: any) => any>(selector: T, time = 30) => {
  const selectorData = useSelector(selector);
  const [data, setState] = useState<unknown>({ ...selectorData });
  const result = useRef<ReturnType<T>>();
  const refTimeout = useRef<ReturnType<typeof setTimeout>>();

  if (refTimeout.current) {
    clearTimeout(refTimeout.current);
  }

  useEffect(() => () => refTimeout.current && clearTimeout(refTimeout.current), []);

  if (time === 0) {
    return selectorData;
  }

  refTimeout.current = setTimeout(() => {
    if (result.current !== selectorData) {
      setState(selectorData);
    }
  }, time);

  return data;
};
