import { useMemo, useState, useCallback } from 'react';

interface SetState<T> {
  (state): void;
}

export function useStateHook<T>(state: T): [T, SetState<T>] {
  const myState = useMemo(() => state, []);
  let updateValue = 0;
  const [update, setUpdate] = useState(updateValue);
  const setState: SetState<T> = useCallback(newState => {
    Object.assign(myState, newState);
    updateValue += 1;
    setUpdate(updateValue);
  }, []);
  return [myState, setState];
}
