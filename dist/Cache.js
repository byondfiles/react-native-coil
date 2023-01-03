"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheKeyIsSimple = exports.createCacheKey = void 0;
function createCacheKey(value) {
    return Object.freeze({ type: 'simple', value });
}
exports.createCacheKey = createCacheKey;
function cacheKeyIsSimple(key) {
    return key.type == 'simple';
}
exports.cacheKeyIsSimple = cacheKeyIsSimple;
