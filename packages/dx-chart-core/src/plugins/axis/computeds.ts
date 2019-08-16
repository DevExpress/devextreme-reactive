import { isHorizontal } from '../../utils/scale';
import {
  LEFT, RIGHT, TOP, BOTTOM, MIDDLE, END, START,
} from '../../constants';
import {
  ScaleObject, GetFormatFn, ProcessTickFn, TickFormatFn, NumberArray, GetTickCoordinatesFn,
  TickCoordinatesGetterFn, Tick, Grid,
} from '../../types';

const getTicks = (scale: ScaleObject, count: number) => (
  scale.ticks ? scale.ticks(count) : scale.domain()
);

const createTicks = <T>(
  scale: ScaleObject, count: number, callback: ProcessTickFn<T>,
): ReadonlyArray<T> => (
  getTicks(scale, count)
    .map((tick, index) => callback(scale(tick), String(index), tick))
);

const getFormat = (scale: ScaleObject, count: number, tickFormat?: TickFormatFn): GetFormatFn => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale, count) : scale.tickFormat(count);
  }
  return tick => tick;
};

const rotatedPositions = {
  [LEFT]: BOTTOM,
  [RIGHT]: TOP,
  [BOTTOM]: LEFT,
  [TOP]: RIGHT,
};

const positionFlags = {
  [LEFT]: false,
  [RIGHT]: false,
  [BOTTOM]: true,
  [TOP]: true,
};

/** @internal */
export const getRotatedPosition = (position: string) => rotatedPositions[position];

/** @internal */
export const isValidPosition = (position: string, scaleName: string, rotated: boolean) =>
  positionFlags[position] === isHorizontal(scaleName, rotated);

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

const createTickFilter = (isHor: boolean, size: number) => (
  isHor
    ? (tick: any) => tick.x1 >= 0 && tick.x1 <= size
    : (tick: any) => tick.y1 >= 0 && tick.y1 <= size
);

/** @internal */
export const tickCoordinatesGetter: TickCoordinatesGetterFn<Tick> = ({
  isHor, scale, tickCount, tickFormat, position, tickSize, indentFromAxis,
}) => {
  const formatTick = getFormat(scale!, tickCount!, tickFormat);
  const options = (isHor ? createHorizontalOptions : createVerticalOptions)(
    position!, tickSize!, indentFromAxis!,
  );
  return (coordinates, key, tick) => ({
    key,
    x1: coordinates,
    x2: coordinates,
    y1: coordinates,
    y2: coordinates,
    xText: coordinates,
    yText: coordinates,
    text: formatTick(tick),
    ...options,
  });
};

/** @internal */
export const gridCoordinatesGetter: TickCoordinatesGetterFn<Grid> = ({ isHor }) => {
  const options = isHor ? { y1: 0 } : { x1: 0 };
  return (coordinates, key) => ({
    key,
    x1: coordinates,
    y1: coordinates,
    ...options,
  });
};

/** @internal */
export const getTickCoordinates: GetTickCoordinatesFn<Tick | Grid> = ({
  scaleName, scale, paneSize, rotated, callback, ...restProps
}) => {
  const isHor = isHorizontal(scaleName, rotated);
  const tickCount = getTickCount(scale.range(), paneSize[1 - Number(isHor)]);
  const ticks = createTicks(scale, tickCount, callback({ isHor, scale, tickCount, ...restProps }));
  const visibleTicks = ticks.filter(createTickFilter(isHor, paneSize[1 - Number(isHor)]));
  return {
    ticks: visibleTicks,
    sides: [Number(isHor), Number(!isHor)],
  };
};
