/* global window */

let hasWindowValue = typeof window !== 'undefined';

const hasWindow = () => hasWindowValue;

let windowObject = hasWindow() ? window : undefined;

export const getNavigator = () => hasWindow() ? windowObject?.navigator : { userAgent: '' };
