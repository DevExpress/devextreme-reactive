import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds, rangesEqual,
  moveBounds, growBounds, invertBoundsRange,
} from '../../utils/scale';
import {
  NumberArray,
  Viewport,
  ScalesCache,
  DomainInfoCache,
  RangesCache,
  DomainInfo,
  DomainBounds,
  OnViewportChangeFn,
  ScaleObject,
  EventHandlers,
  Location,
  Interaction,
} from '../../types';
import { Size } from '@devexpress/dx-react-core';

const getArgumentBounds = (viewport?: Viewport): DomainBounds | null => (
  viewport && viewport.argumentStart !== undefined && viewport.argumentEnd !== undefined
    ? [viewport.argumentStart, viewport.argumentEnd] : null
);

const getValueBounds = (viewport?: Viewport): DomainBounds | null => (
  viewport && viewport.valueStart !== undefined && viewport.valueEnd !== undefined
    ? [viewport.valueStart, viewport.valueEnd] : null
);

const getValueScaleName = (viewport?: Viewport) => (
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
  domains: DomainInfoCache, ranges: RangesCache, viewport?: Viewport,
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
  interaction: Interaction, type: Interaction, delta: number, anchor: number, range?: NumberArray,
): DomainBounds | null => {
  if (!checkInteraction(interaction, type)) {
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
  rotated: boolean,
  [argInteraction, valInteraction]: Readonly<[Interaction, Interaction]>, type: Interaction,
  deltas: Readonly<[number, number]> | null,
  anchors: Readonly<[number, number]> | null,
  ranges: Readonly<[NumberArray, NumberArray]> | null,
  viewport?: Viewport, onViewportChange?: OnViewportChangeFn,
) => {
  const argIndex = Number(rotated);
  const valIndex = 1 - argIndex;
  const changes: any = {};
  const argumentBounds = boundsForScale(
    ARGUMENT_DOMAIN, scales, getArgumentBounds(viewport),
    argInteraction, type,
    deltas ? deltas[argIndex] : 0, anchors ? anchors[argIndex] : 0,
    ranges ? ranges[argIndex] : undefined,
  );
  const valueBounds = boundsForScale(
    getValueScaleName(viewport), scales, getValueBounds(viewport),
    valInteraction, type,
    deltas ? deltas[valIndex] : 0, anchors ? anchors[valIndex] : 0,
    ranges ? ranges[valIndex] : undefined,
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

/** @internal */
export const getRect = (
  rotated: boolean,
  interactionWithArguments: Interaction,
  interactionWithValues: Interaction,
  initial: Location,
  current: Location,
  pane: Size,
) => {
  const isZoomArgument = checkInteraction(interactionWithArguments, 'zoom');
  const isZoomValue = checkInteraction(interactionWithValues, 'zoom');
  const isXFixed = rotated ? isZoomValue : isZoomArgument;
  const isYFixed = rotated ? isZoomArgument : isZoomValue;
  const x = isXFixed ? Math.min(initial[0], current[0]) : 0;
  const width = isXFixed ? Math.abs(initial[0] - current[0]) : pane.width;
  const y = isYFixed ? Math.min(initial[1], current[1]) : 0;
  const height = isYFixed ? Math.abs(initial[1] - current[1]) : pane.height;
  return {
    x, y, width, height,
  };
};

const checkInteraction = (interaction: Interaction, type: Interaction) =>
interaction === 'both' || interaction === type;

/** @internal */
export const setCursorType = (node: any, type?: string) => {
  const defaultType = 'pointer';
  node.style.cursor = type ? type : defaultType;
};
