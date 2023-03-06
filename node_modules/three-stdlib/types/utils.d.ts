export declare type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
