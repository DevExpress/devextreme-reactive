import { isHorizontal, fixOffset } from '../../utils/scale';
import {
  LEFT, BOTTOM, MIDDLE, END, START,
} from '../../constants';
import {
  ScaleObject, GetFormatFn, ProcessTickFn, TickFormatFn, AxisCoordinatesFn,
  GetGridCoordinatesFn, Tick, NumberArray,
} from '../../types';

const getTicks = (scale: ScaleObject, count: number) => (
  scale.ticks ? scale.ticks(count) : scale.domain()
);

const createTicks = <T>(
  scale: ScaleObject, count: number, callback: ProcessTickFn<T>,
): ReadonlyArray<T> => {
  const fixedScale = fixOffset(scale);
  return getTicks(scale, count)
    .map((tick, index) => callback(fixedScale(tick), String(index), tick));
};

const getFormat = (scale: ScaleObject, count: number, tickFormat?: TickFormatFn): GetFormatFn => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale, count) : scale.tickFormat(count);
  }
  return tick => tick;
};

const createHorizontalOptions = (position: string, tickSize: number, indentFromAxis: number) => {
  // Make *position* orientation agnostic - should be START or END.
  const isStart = position === BOTTOM;
  return {
    y1: 0,
    y2: isStart ? +tickSize : -tickSize,
    yText: isStart ? +indentFromAxis : -indentFromAxis,
    dy: isStart ? '1em' : '0em',
    textAnchor: MIDDLE,
  };
};

const createVerticalOptions = (position: string, tickSize: number, indentFromAxis: number) => {
  // Make *position* orientation agnostic - should be START or END.
  const isStart = position === LEFT;
  return {
    x1: 0,
    x2: isStart ? -tickSize : +tickSize,
    xText: isStart ? -indentFromAxis : +indentFromAxis,
    dy: '0.3em',
    textAnchor: isStart ? END : START,
  };
};

// Constant is selected to preserve original behavior described in
// https://github.com/d3/d3-scale#continuous_ticks.
const DEFAULT_TICK_COUNT = 10;
const getTickCount = (scaleRange: NumberArray, paneSize: number) => {
  const rangeToPaneRatio = Math.abs(scaleRange[0] - scaleRange[1]) / paneSize;
  return Math.round(DEFAULT_TICK_COUNT * (isFinite(rangeToPaneRatio) ? rangeToPaneRatio : 1));
};

/** @internal */
export const axisCoordinates: AxisCoordinatesFn = ({
  scaleName,
  scale,
  position,
  tickSize,
  tickFormat,
  indentFromAxis,
  paneSize,
  isRotated,
})  => {
  const isHor = isHorizontal(scaleName, isRotated);
  const options = (isHor ? createHorizontalOptions : createVerticalOptions)(
    position, tickSize, indentFromAxis,
  );
  const tickCount = getTickCount(scale.range(), paneSize[1 - Number(isHor)]);
  const formatTick = getFormat(scale, tickCount, tickFormat);
  const ticks = createTicks(scale, tickCount, (coordinates, key, tick) => ({
    key,
    x1: coordinates,
    x2: coordinates,
    y1: coordinates,
    y2: coordinates,
    xText: coordinates,
    yText: coordinates,
    text: formatTick(tick),
    ...options,
  }));
  return {
    ticks,
    sides: [Number(isHor), Number(!isHor)],
  };
};

// It is a part of a temporary walkaround. See note in Axis plugin.
/** @internal */
export const createTickFilter = ([width, height]: NumberArray) => (
  width > 0
    ? (tick: Tick) => tick.x1 >= 0 && tick.x1 <= width
    : (tick: Tick) => tick.y1 >= 0 && tick.y1 <= height
);

const horizontalGridOptions = { y: 0, dy: 1 };
const verticalGridOptions = { x: 0, dx: 1 };

/** @internal */
export const getGridCoordinates: GetGridCoordinatesFn = ({
  scaleName, scale, paneSize, isRotated,
}) => {
  const isHor = isHorizontal(scaleName, isRotated);
  const tickCount = getTickCount(scale.range(), paneSize[1 - Number(isHor)]);
  const options = isHor ? horizontalGridOptions : verticalGridOptions;
  return createTicks(scale, tickCount, (coordinates, key) => ({
    key,
    x: coordinates,
    y: coordinates,
    dx: 0,
    dy: 0,
    ...options,
  }));
};
