import { FieldDictionary } from '../../types';
import { FieldListConfig } from './list';
interface DynamicList<Item extends object> {
    fields: FieldDictionary<Item>[];
    addField(): void;
    removeField(index: number): void;
}
export declare function useDynamicList<Item extends object>(listOrConfig: FieldListConfig<Item> | Item[], fieldFactory: Function, validationDependencies?: unknown[]): DynamicList<Item>;
export {};
//# sourceMappingURL=dynamiclist.d.ts.map