import { getWidth } from '../../utils/scale';
import {
  HORIZONTAL, TOP, LEFT, MIDDLE, END, START,
} from '../../constants';

const getTicks = scale => (scale.ticks ? scale.ticks() : scale.domain());

// Same code can be found in series coordinates calculation.
const fixScaleOffset = (scale) => {
  const offset = getWidth(scale) / 2;
  return value => scale(value) + offset;
};

const getFormat = (scale, tickFormat) => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale) : scale.tickFormat();
  }
  return tick => tick;
};

const createHorizontalProcessor = (scale, position, tickSize, indentFromAxis, formatTick) => {
  const isStart = position === TOP;
  const dominantBaseline = isStart ? 'baseline' : 'hanging';
  const textAnchor = MIDDLE;
  return (tick, index) => {
    const coordinates = scale(tick);
    return {
      key: index,
      x1: coordinates,
      x2: coordinates,
      y1: isStart ? -tickSize : 0,
      y2: isStart ? 0 : +tickSize,
      xText: coordinates,
      yText: isStart ? -indentFromAxis : +indentFromAxis,
      dominantBaseline,
      textAnchor,
      text: formatTick(tick),
    };
  };
};

const createVerticalProcessor = (scale, position, tickSize, indentFromAxis, formatTick) => {
  const isStart = position === LEFT;
  const dominantBaseline = MIDDLE;
  const textAnchor = isStart ? END : START;
  return (tick, index) => {
    const coordinates = scale(tick);
    return {
      key: index,
      x1: isStart ? -tickSize : 0,
      x2: isStart ? 0 : +tickSize,
      y1: coordinates,
      y2: coordinates,
      xText: isStart ? -indentFromAxis : +indentFromAxis,
      yText: coordinates,
      dominantBaseline,
      textAnchor,
      text: formatTick(tick),
    };
  };
};

// It is called for grid (which does not have labels) - how is it handled here?
export const axisCoordinates = ({
  scale,
  orientation,
  position,
  tickSize,
  tickFormat,
  indentFromAxis,
}) => {
  const isHorizontal = orientation === HORIZONTAL;
  const ticks = getTicks(scale);
  const processTick = (isHorizontal ? createHorizontalProcessor : createVerticalProcessor)(
    fixScaleOffset(scale), position, tickSize, indentFromAxis, getFormat(scale, tickFormat),
  );
  return ticks.map(processTick);
};

export const axesData = (axes, axisProps) => [...axes, axisProps];
