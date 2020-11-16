import React from 'react';
export interface Variant {
    price: string;
    optionName: string;
    optionValue: string;
}
export declare function TextField({ name, label, onChange, onBlur, value, error, }: TextFieldProps): JSX.Element;
export declare function randomVariants(number: number): Variant[];
export declare function changeEvent(value: string): React.ChangeEvent<HTMLInputElement>;
export declare function alwaysFail(value: any): string;
export declare function clickEvent(): any;
interface TextFieldProps {
    name: string;
    value: string;
    label: string;
    error?: string;
    onChange(value: any): void;
    onBlur(): void;
}
export {};
//# sourceMappingURL=utils.d.ts.map