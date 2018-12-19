/** @internal */
export const easeInQuad = t => t * t;
/** @internal */
export const easeOutQuad = t => t * (2 - t);
/** @internal */
export const easeInOutQuad = t => (t < 0.5
  ? 2 * t * t
  : -1 + ((4 - (2 * t)) * t));

/** @internal */
export const easeInCubic = t => t * t * t;
/** @internal */
export const easeOutCubic = t => ((t - 1) * (t - 1) * (t - 1)) + 1;
/** @internal */
export const easeInOutCubic = t => (t < 0.5
  ? 4 * t * t * t
  : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1);

/** @internal */
export const easeInQuart = t => t * t * t * t;
/** @internal */
export const easeOutQuart = t => 1 - ((t - 1) * (t - 1) * (t - 1) * (t - 1));
/** @internal */
export const easeInOutQuart = t => (t < 0.5
  ? 8 * t * t * t * t
  : 1 - (8 * (t - 1) * (t - 1) * (t - 1) * (t - 1)));

/** @internal */
export const easeInQuint = t => t * t * t * t * t;
/** @internal */
export const easeOutQuint = t => 1 + ((t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1));
/** @internal */
export const easeInOutQuint = t => (t < 0.5
  ? 16 * t * t * t * t * t
  : 1 + (16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1)));
