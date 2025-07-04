"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModalPresentation = isModalPresentation;
exports.isTransparentModalPresentation = isTransparentModalPresentation;
exports.useIsDesktop = useIsDesktop;
const react_1 = __importDefault(require("react"));
/**
 * Helper to determine if a given screen should be treated as a modal-type presentation
 *
 * @internal
 */
function isModalPresentation(options) {
    const presentation = options?.presentation;
    return (presentation === 'modal' ||
        presentation === 'formSheet' ||
        presentation === 'fullScreenModal' ||
        presentation === 'containedModal' ||
        presentation === 'transparentModal' ||
        presentation === 'containedTransparentModal');
}
/**
 * Helper to determine if a given screen should be treated as a transparent modal-type presentation
 *
 * @internal
 */
function isTransparentModalPresentation(options) {
    const presentation = options?.presentation;
    return presentation === 'transparentModal' || presentation === 'containedTransparentModal';
}
/**
 * SSR-safe viewport detection: initial render always returns `false` so that
 * server and client markup match. The actual media query evaluation happens
 * after mount.
 *
 * @internal
 */
function useIsDesktop(breakpoint = 768) {
    const isWeb = process.env.EXPO_OS === 'web';
    // Ensure server-side and initial client render agree (mobile first).
    const [isDesktop, setIsDesktop] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        if (!isWeb || typeof window === 'undefined')
            return;
        const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
        const listener = (e) => setIsDesktop(e.matches);
        // Update immediately after mount
        setIsDesktop(mql.matches);
        mql.addEventListener('change', listener);
        return () => mql.removeEventListener('change', listener);
    }, [breakpoint, isWeb]);
    return isDesktop;
}
//# sourceMappingURL=utils.js.map