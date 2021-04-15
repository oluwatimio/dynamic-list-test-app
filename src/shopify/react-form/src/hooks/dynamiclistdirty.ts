import {DynamicListBag} from '../types';

export function useDynamicListDirty(lists?: DynamicListBag) {
  return lists ? Object.entries(lists).some(([key, value]) => lists[key].dirty) : false
}
