export declare type CoilCacheKey = CoilCacheKeySimple | CoilCacheKeyComplex;
export interface CoilCacheKeyBase {
    type: 'simple' | 'complex';
}
export interface CoilCacheKeyComplex extends CoilCacheKeyBase {
    base: string;
    transformations: string[];
    size: {
        width: number;
        height: number;
    };
    parameters: Record<string, string>;
}
export interface CoilCacheKeySimple extends CoilCacheKeyBase {
    value: string;
}
export declare function createCacheKey(value: string): CoilCacheKeySimple;
export declare function cacheKeyIsSimple(key: CoilCacheKey): key is CoilCacheKeySimple;
