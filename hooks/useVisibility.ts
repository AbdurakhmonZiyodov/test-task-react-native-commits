import { useCallback, useMemo, useState } from 'react';

const useVisibility = (initialState?: boolean) => {
  const [visible, setVisible] = useState(initialState || false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible((prev) => !prev), []);
  const set = useCallback((newValue: boolean) => setVisible(newValue), []);

  return useMemo(
    () => ({
      visible,
      show,
      hide,
      toggle,
      set,
    }),
    [visible, show, hide, toggle, set],
  );
};

export type UseVisibility = ReturnType<typeof useVisibility>;

export default useVisibility;
