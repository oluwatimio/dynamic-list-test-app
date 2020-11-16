/// <reference types="react" />
import { ValidationDictionary, FieldDictionary, ListValidationContext } from '../../types';
import { ListAction } from './utils';
export interface FieldListConfig<Item extends object> {
    list: Item[];
    validates?: Partial<ValidationDictionary<Item, ListValidationContext<Item>>>;
}
interface BaseList<Item extends object> {
    fields: FieldDictionary<Item>[];
    dispatch: React.Dispatch<ListAction<Item>>;
}
export declare function useBaseList<Item extends object>(listOrConfig: FieldListConfig<Item> | Item[], validationDependencies?: unknown[]): BaseList<Item>;
export {};
//# sourceMappingURL=baselist.d.ts.map