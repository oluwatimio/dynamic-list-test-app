import {useCallback, useRef} from 'react';

import {DynamicListBag} from '../types';

export function useDynamicListReset(lists?: DynamicListBag) {
  const listBagRef = useRef(lists);
  listBagRef.current = lists;

  return useCallback(() => {
    return resetFields(listBagRef.current);
  }, []);
}

function resetFields(lists?: DynamicListBag) {
  if (lists) {
    Object.entries(lists).forEach(([key, value]) => lists[key].reset())
  }
}
