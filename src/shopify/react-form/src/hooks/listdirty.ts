import {ListBag} from '../types';

export function useListDirty(lists?: ListBag) {
  return lists ? lists?.dynamicList.dirty : false;
}
