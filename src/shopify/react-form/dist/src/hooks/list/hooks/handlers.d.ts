/// <reference types="react" />
import { FieldDictionary, NormalizedValidationDictionary } from '../../../types';
import { ListState, ListAction } from './index';
export declare function useHandlers<Item extends object>(state: ListState<Item>, dispatch: React.Dispatch<ListAction<Item>>, validationConfigs: NormalizedValidationDictionary<any>): FieldDictionary<Item>[];
//# sourceMappingURL=handlers.d.ts.map