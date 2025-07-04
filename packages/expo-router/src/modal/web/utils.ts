'use client';
import React from 'react';

import { ExtendedStackNavigationOptions } from '../../layouts/StackClient';

/**
 * Helper to determine if a given screen should be treated as a modal-type presentation
 *
 * @internal
 */
export function isModalPresentation(
  options?: Partial<Pick<ExtendedStackNavigationOptions, 'presentation'>> | null
) {
  const presentation = options?.presentation;
  return (
    presentation === 'modal' ||
    presentation === 'formSheet' ||
    presentation === 'fullScreenModal' ||
    presentation === 'containedModal' ||
    presentation === 'transparentModal' ||
    presentation === 'containedTransparentModal'
  );
}

/**
 * Helper to determine if a given screen should be treated as a transparent modal-type presentation
 *
 * @internal
 */
export function isTransparentModalPresentation(
  options?: Partial<Pick<ExtendedStackNavigationOptions, 'presentation'>> | null
) {
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
export function useIsDesktop(breakpoint: number = 768) {
  const isWeb = process.env.EXPO_OS === 'web';

  // Ensure server-side and initial client render agree (mobile first).
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isWeb || typeof window === 'undefined') return;

    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    // Update immediately after mount
    setIsDesktop(mql.matches);

    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [breakpoint, isWeb]);

  return isDesktop;
}
