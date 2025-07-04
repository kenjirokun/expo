import { ExtendedStackNavigationOptions } from '../../layouts/StackClient';
/**
 * Helper to determine if a given screen should be treated as a modal-type presentation
 *
 * @internal
 */
export declare function isModalPresentation(options?: Partial<Pick<ExtendedStackNavigationOptions, 'presentation'>> | null): boolean;
/**
 * Helper to determine if a given screen should be treated as a transparent modal-type presentation
 *
 * @internal
 */
export declare function isTransparentModalPresentation(options?: Partial<Pick<ExtendedStackNavigationOptions, 'presentation'>> | null): boolean;
/**
 * SSR-safe viewport detection: initial render always returns `false` so that
 * server and client markup match. The actual media query evaluation happens
 * after mount.
 *
 * @internal
 */
export declare function useIsDesktop(breakpoint?: number): boolean;
//# sourceMappingURL=utils.d.ts.map