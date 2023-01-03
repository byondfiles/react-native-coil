"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coil = exports.createRoundedTransform = exports.createGrayscaleTransform = exports.createCircleTransform = exports.createBlurTransform = exports.CoilCachePolicy = exports.CoilScale = exports.CoilResizeMode = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Cache_1 = require("./Cache");
var CoilResizeMode;
(function (CoilResizeMode) {
    CoilResizeMode["CONTAIN"] = "contain";
    CoilResizeMode["COVER"] = "cover";
    CoilResizeMode["STRETCH"] = "stretch";
    CoilResizeMode["CENTER"] = "center";
})(CoilResizeMode = exports.CoilResizeMode || (exports.CoilResizeMode = {}));
var CoilScale;
(function (CoilScale) {
    CoilScale["FILL"] = "fill";
    CoilScale["FIT"] = "fit";
})(CoilScale = exports.CoilScale || (exports.CoilScale = {}));
var CoilCachePolicy;
(function (CoilCachePolicy) {
    CoilCachePolicy["ENABLED"] = "ENABLED";
    CoilCachePolicy["DISABLED"] = "DISABLED";
    CoilCachePolicy["WRITE_ONLY"] = "WRITE_ONLY";
    CoilCachePolicy["READ_ONLY"] = "READ_ONLY";
})(CoilCachePolicy = exports.CoilCachePolicy || (exports.CoilCachePolicy = {}));
function createBlurTransform(radius, sampling = 1) {
    return { className: 'blur', args: [radius, sampling] };
}
exports.createBlurTransform = createBlurTransform;
function createCircleTransform() {
    return { className: 'circle', args: [] };
}
exports.createCircleTransform = createCircleTransform;
function createGrayscaleTransform() {
    return { className: 'grayscale', args: [] };
}
exports.createGrayscaleTransform = createGrayscaleTransform;
function createRoundedTransform(radius) {
    let args = [0, 0, 0, 0];
    if (typeof radius == 'number') {
        args.fill(radius);
    }
    else {
        args = radius;
    }
    return { className: 'rounded', args };
}
exports.createRoundedTransform = createRoundedTransform;
const CoilNative = react_native_1.requireNativeComponent('RCTCoilView');
const CoilModule = react_native_1.NativeModules.CoilModule;
const CoilBase = react_1.forwardRef((props, ref) => {
    if (props.transforms?.some(transform => transform.className == 'rounded')) {
        if (!props.size) {
            console.warn('props `size` is empty while `rounded` is used, please specify `size` to prevent unexpected behavior');
        }
    }
    if (props.videoFrameMilis && props.videoFrameMicro) {
        console.warn('You have both `videoFrameMilis` and `videoFrameMicro` props, please select one of that');
    }
    const computedStyle = react_1.useMemo(() => react_native_1.StyleSheet.flatten([styles.wrapper, props.style]), [props.style]);
    const onCoilSuccess = (event) => {
        if (typeof props.onSuccess == 'function') {
            props.onSuccess({
                ...event,
                nativeEvent: {
                    ...event.nativeEvent,
                    memoryCacheKey: Object.freeze(event.nativeEvent.memoryCacheKey)
                }
            });
        }
    };
    const Renderer = react_1.useMemo(() => props.renderer || CoilNative, []);
    return (react_1.default.createElement(react_native_1.View, Object.assign({}, props, { style: computedStyle }),
        react_1.default.createElement(Renderer, Object.assign({ style: react_native_1.StyleSheet.absoluteFillObject, source: props.source, ref: ref, transform: props.transforms || [], resizeMode: props.resizeMode || CoilResizeMode.CENTER, crossfade: props.crossfade, size: props.size, placeholder: props.placeholder, error: props.error, fallback: props.fallback, memoryCacheKey: props.memoryCacheKey, placeholderMemoryCacheKey: props.placeholderMemoryCacheKey, videoFrameMilis: props.videoFrameMilis, videoFrameMicro: props.videoFrameMicro, onCoilStart: props.onStart, onCoilError: props.onError, onCoilSuccess: onCoilSuccess, onCoilCancel: props.onCancel }, props.rendererProps))));
});
exports.Coil = Object.assign(CoilBase, CoilModule, { createCacheKey: Cache_1.createCacheKey });
const styles = react_native_1.StyleSheet.create({
    wrapper: {
        overflow: 'hidden'
    }
});
