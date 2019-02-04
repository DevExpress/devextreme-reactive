import { isHorizontal, fixOffset } from '../../utils/scale';
import {
  LEFT, BOTTOM, MIDDLE, END, START,
} from '../../constants';
import { Scale, GetFormatFn } from '../../types';

type ProcessTickFn<T> = (coord: number, key: string, tick: any) => T;
type TickFormatFn = (scale: Scale) => GetFormatFn;

const getTicks = (scale: Scale): any[] => (scale.ticks ? scale.ticks() : scale.domain());

const createTicks = <T>(scale: Scale, callback: ProcessTickFn<T>) => {
  const fixedScale = fixOffset(scale);
  return getTicks(scale).map((tick, index) => callback(fixedScale(tick), String(index), tick));
};

const getFormat = (scale: Scale, tickFormat: TickFormatFn) => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale) : scale.tickFormat();
  }
  return (tick => tick) as GetFormatFn;
};

const createHorizontalOptions = (position: string, tickSize: number, indentFromAxis: number) => {
  // Make *position* orientation agnostic - should be START or END.
  const isStart = position === BOTTOM;
  return {
    y1: 0,
    y2: isStart ? +tickSize : -tickSize,
    yText: isStart ? +indentFromAxis : -indentFromAxis,
    dominantBaseline: isStart ? 'hanging' : 'baseline',
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
    dominantBaseline: MIDDLE,
    textAnchor: isStart ? END : START,
  };
};

type AxisCoordinatesArg = {
  readonly scaleName: string;
  readonly scale: Scale;
  readonly position: string;
  readonly tickSize: number;
  readonly tickFormat: TickFormatFn;
  readonly indentFromAxis: number;
};
type Tick = {
  readonly key: string;
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
  readonly xText: number;
  readonly yText: number;
  readonly dominantBaseline: string;
  readonly textAnchor: string;
  readonly text: string;
};

export const axisCoordinates = ({
  scaleName,
  scale,
  position,
  tickSize,
  tickFormat,
  indentFromAxis,
}: AxisCoordinatesArg) => {
  const isHor = isHorizontal(scaleName);
  const options = (isHor ? createHorizontalOptions : createVerticalOptions)(
    position, tickSize, indentFromAxis,
  );
  const formatTick = getFormat(scale, tickFormat);
  const ticks = createTicks(scale, (coordinates, key, tick) => {
    const ret: Tick = {
      key,
      x1: coordinates,
      x2: coordinates,
      y1: coordinates,
      y2: coordinates,
      xText: coordinates,
      yText: coordinates,
      text: formatTick(tick),
      ...options,
    };
    return ret;
  });
  return {
    ticks,
    sides: [Number(isHor), Number(!isHor)],
  };
};

const horizontalGridOptions = { y: 0, dy: 1 };
const verticalGridOptions = { x: 0, dx: 1 };

type GridCoordinatesArg = {
  readonly scaleName: string;
  readonly scale: Scale;
};
type Grid = {
  readonly key: string;
  readonly x: number;
  readonly y: number;
  readonly dx: number;
  readonly dy: number;
};

export const getGridCoordinates = ({ scaleName, scale }: GridCoordinatesArg) => {
  const isHor = isHorizontal(scaleName);
  const options = isHor ? horizontalGridOptions : verticalGridOptions;
  return createTicks(scale, (coordinates, key) => {
    const ret: Grid = {
      key,
      x: coordinates,
      y: coordinates,
      dx: 0,
      dy: 0,
      ...options,
    };
    return ret;
  });
};
