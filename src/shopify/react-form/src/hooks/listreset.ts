import {useCallback, useRef} from 'react';

import {ListBag} from '../types';

export function useListReset(lists?: ListBag) {
  const listBagRef = useRef(lists);
  listBagRef.current = lists;

  return useCallback(() => {
    return resetFields(listBagRef.current);
  }, []);
}

function resetFields(lists?: ListBag) {
  lists?.dynamicList.reset();
}
