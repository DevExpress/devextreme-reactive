import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds, rangesEqual,
  moveBounds, growBounds, invertBoundsRange,
} from '../../utils/scale';
import {
  NumberArray,
  ViewportOptions,
  ScalesCache,
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
  OnViewportChangeFn,
  ScaleObject,
  EventHandlers,
} from '../../types';

const getArgumentBounds = (viewport?: ViewportOptions): DomainBounds | null => (
  viewport && viewport.argumentStart !== undefined && viewport.argumentEnd !== undefined
    ? [viewport.argumentStart, viewport.argumentEnd] : null
);

const getValueBounds = (viewport?: ViewportOptions): DomainBounds | null => (
  viewport && viewport.valueStart !== undefined && viewport.valueEnd !== undefined
    ? [viewport.valueStart, viewport.valueEnd] : null
);

const getValueScaleName = (viewport?: ViewportOptions) => (
  getValueDomainName(viewport && viewport.scaleName)
);

const getDefaultBounds = (scale: ScaleObject): DomainBounds => {
  const domain = scale.domain();
  return [domain[0], domain[domain.length - 1]];
};

const proportionallyExtendRange = (range: NumberArray, subRange: NumberArray): NumberArray => {
  const p = (subRange[0] - subRange[1]) / (range[0] - range[1]);
  const q = subRange[0] - p * range[0];
  return [
    (range[0] - q) / p,
    (range[1] - q) / p,
  ];
};

const adjustRange = (domain: DomainInfo, bounds: DomainBounds, range: NumberArray) => {
  const scale = makeScale(domain, range);
  const subRange = scaleBounds(scale, bounds);
  return rangesEqual(subRange, range) ? range : proportionallyExtendRange(range, subRange);
};

const update = (
  ranges: RangesCache, changes: any, key: string, domain: DomainInfo, bounds: DomainBounds,
) => {
  const newRange = adjustRange(domain, bounds, ranges[key]);
  if (newRange !== ranges[key]) {
    changes[key] = newRange;
  }
};

/** @internal */
export const adjustLayout = (
  domains: DomainInfoCache, ranges: RangesCache, viewport?: ViewportOptions,
) => {
  const changes = {};
  const argumentBounds = getArgumentBounds(viewport);
  if (argumentBounds) {
    update(ranges, changes, ARGUMENT_DOMAIN, domains[ARGUMENT_DOMAIN], argumentBounds);
  }
  const valueBounds = getValueBounds(viewport);
  if (valueBounds) {
    update(ranges, changes, VALUE_DOMAIN, domains[getValueScaleName(viewport)], valueBounds);
  }
  return Object.keys(changes).length ? { ...ranges, ...changes } : ranges;
};

const boundsForScale = (
  name: string, scales: ScalesCache, currentBounds: DomainBounds | null,
  interaction: string, type: string, delta: number, anchor: number, range?: NumberArray,
): DomainBounds | null => {
  if (interaction !== type && interaction !== 'both') {
    return null;
  }
  const scale = scales[name];
  const bounds = currentBounds || getDefaultBounds(scale);
  let newBounds: DomainBounds;
  if (type === 'pan') {
    newBounds = moveBounds(scale, bounds, delta);
  } else if (type === 'zoom') {
    newBounds = range ? invertBoundsRange(scale, range) : growBounds(scale, bounds, delta, anchor);
  }
  return newBounds! !== bounds ? newBounds! : null;
};

/** @internal */
export const getViewport = (
  scales: ScalesCache,
  interactions: Readonly<[string, string]>, type: string,
  deltas: Readonly<[number, number]> | null,
  anchors: Readonly<[number, number]> | null,
  ranges: Readonly<[NumberArray, NumberArray]> | null,
  viewport?: ViewportOptions, onViewportChange?: OnViewportChangeFn,
) => {
  const changes: any = {};
  const argumentBounds = boundsForScale(
    ARGUMENT_DOMAIN, scales, getArgumentBounds(viewport),
    interactions[0], type,
    deltas ? deltas[0] : 0, anchors ? anchors[0] : 0,
    ranges ? ranges[0] : undefined,
  );
  const valueBounds = boundsForScale(
    getValueScaleName(viewport), scales, getValueBounds(viewport),
    interactions[1], type,
    deltas ? deltas[1] : 0, anchors ? anchors[1] : 0,
    ranges ? ranges[1] : undefined,
  );
  if (argumentBounds) {
    changes.argumentStart = argumentBounds[0];
    changes.argumentEnd = argumentBounds[1];
  }
  if (valueBounds) {
    changes.valueStart = valueBounds[0];
    changes.valueEnd = valueBounds[1];
  }
  if (Object.keys(changes).length) {
    const newViewport = { ...viewport, ...changes };
    if (onViewportChange) {
      onViewportChange(newViewport);
    }
    return { viewport: newViewport };
  }
  return null;
};

/** @internal */
export const getDeltaForTouches = (touches: Touch[]) => {
  const deltaX = touches[0].pageX - touches[1].pageX;
  const deltaY = touches[0].pageY - touches[1].pageY;
  const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const center: NumberArray = [
    (touches[0].pageX + touches[1].pageX) / 2,
    (touches[0].pageY + touches[1].pageY) / 2,
  ];
  return { delta, center };
};

/** @internal */
export const isKeyPressed = (event: MouseEvent, key: string) => event[`${key}Key`];

/** @internal */
export const getWheelDelta = ({ wheelDelta, deltaY }: { wheelDelta?: number, deltaY?: number }) => {
  return wheelDelta !== undefined ? wheelDelta : deltaY! * -30; // deltaY for FF
};

/** @internal */
export const isMultiTouch = (e: any) => e.touches && e.touches.length === 2;

/** @internal */
export const attachEvents = (node: any, handlers: EventHandlers) => {
  Object.keys(handlers).forEach((el) => {
    node.addEventListener(el, handlers[el], { passive: false });
  });
};

/** @internal */
export const detachEvents = (node: any, handlers: EventHandlers) => {
  Object.keys(handlers).forEach((el) => {
    node.removeEventListener(el, handlers[el]);
  });
};
