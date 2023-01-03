import { default as React, PropsWithoutRef, RefAttributes } from 'react';
import { View, NativeSyntheticEvent, ViewProps } from 'react-native';
import { CoilCacheKey, CoilCacheKeyComplex, CoilCacheKeySimple } from './Cache';
export interface CoilOptions extends CoilCommon, CoilCache {
    availableMemoryPercentage?: number;
    allowHardware?: boolean;
    allowRgba565?: boolean;
    crossfade?: boolean | number;
    bitmapPoolingEnabled?: boolean;
    bitmapPoolPercentage?: number;
}
export interface CoilCommon {
    placeholder?: string;
    fallback?: string;
    error?: string;
}
export interface CoilStatic {
    setLoaderOptions: (options: CoilOptions) => void;
    prefetch: (sources: string[], loadTo: 'DISK' | 'MEMORY') => void;
    clearAllCache: () => void;
    clearMemoryCache: () => void;
    clearDiskCache: () => void;
    createCacheKey: (value: string) => CoilCacheKeySimple;
}
export declare type CoilComponentType = React.ForwardRefExoticComponent<PropsWithoutRef<CoilProps> & RefAttributes<View>> & CoilStatic;
export interface CoilProps extends Partial<CoilEvent>, ViewProps, CoilCommon {
    source: CoilSource;
    transforms?: CoilTransform[];
    resizeMode?: CoilResizeMode;
    scale?: CoilScale;
    crossfade?: number;
    size?: [number, number];
    memoryCacheKey?: CoilCacheKey;
    placeholderMemoryCacheKey?: CoilCacheKey;
    videoFrameMilis?: number;
    videoFrameMicro?: number;
    renderer?: React.ComponentType<Omit<CoilProps, 'renderer' | 'rendererProps'>>;
    rendererProps?: Record<string, any>;
}
export interface CoilSource extends CoilCache {
    uri: string;
    headers?: Record<string, string>;
}
export declare enum CoilResizeMode {
    CONTAIN = "contain",
    COVER = "cover",
    STRETCH = "stretch",
    CENTER = "center"
}
export declare enum CoilScale {
    FILL = "fill",
    FIT = "fit"
}
export declare type CoilCache = Partial<Record<'diskCachePolicy' | 'memoryCachePolicy' | 'networkCachePolicy', CoilCachePolicy>>;
export declare enum CoilCachePolicy {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    WRITE_ONLY = "WRITE_ONLY",
    READ_ONLY = "READ_ONLY"
}
export interface CoilEvent {
    onStart: (event: NativeSyntheticEvent<null>) => void;
    onCancel: (event: NativeSyntheticEvent<null>) => void;
    onError: (event: NativeSyntheticEvent<CoilErrorEvent>) => void;
    onSuccess: (event: NativeSyntheticEvent<CoilSuccessEvent>) => void;
}
export interface CoilErrorEvent {
    error: string;
}
export interface CoilSuccessEvent {
    isSampled: boolean;
    dataSource: 'MEMORY' | 'DISK' | 'NETWORK';
    cachedInMemory: boolean;
    memoryCacheKey: CoilCacheKeySimple | CoilCacheKeyComplex;
    isPlaceholderMemoryCacheKeyPresent: boolean;
}
export interface CoilTransform {
    className: string;
    args: any[];
}
export declare function createBlurTransform(radius: number, sampling?: number): CoilTransform;
export declare function createCircleTransform(): CoilTransform;
export declare function createGrayscaleTransform(): CoilTransform;
export declare type RoundedTransformEdge = [number, number, number, number];
export declare function createRoundedTransform(radius?: number | RoundedTransformEdge): CoilTransform;
export declare const Coil: CoilComponentType;
