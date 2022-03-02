/* global window */

const hasWindowValue = typeof window !== 'undefined';

const hasWindow = () => hasWindowValue;

const windowObject = hasWindow() ? window : undefined;

export const getNavigator = () => hasWindow() ? windowObject?.navigator : { userAgent: '' };
