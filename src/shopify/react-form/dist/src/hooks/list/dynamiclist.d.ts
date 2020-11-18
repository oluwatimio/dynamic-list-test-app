import { FieldDictionary } from '../../types';
import { FieldListConfig } from './baselist';
interface DynamicList<Item extends object> {
    fields: FieldDictionary<Item>[];
    addItem(factoryArgument?: any): void;
    removeItem(index: number): void;
}
declare type FactoryFunction<Item extends object> = (factoryArgument?: any) => Item | Item[];
export declare function useDynamicList<Item extends object>(listOrConfig: FieldListConfig<Item> | Item[], fieldFactory: FactoryFunction<Item>, validationDependencies?: unknown[]): DynamicList<Item>;
export {};
//# sourceMappingURL=dynamiclist.d.ts.map