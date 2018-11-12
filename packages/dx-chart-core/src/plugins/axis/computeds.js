import { getWidth } from '../../utils/scale';
import {
  HORIZONTAL, LEFT, BOTTOM, MIDDLE, END, START, ARGUMENT_DOMAIN,
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

const createHorizontalOptions = (position, tickSize, indentFromAxis) => {
  // Make *position* should be orientation agnostic - START or END.
  const isStart = position === BOTTOM;
  return {
    y1: 0,
    y2: isStart ? +tickSize : -tickSize,
    yText: isStart ? +indentFromAxis : -indentFromAxis,
    dominantBaseline: isStart ? 'hanging' : 'baseline',
    textAnchor: MIDDLE,
  };
};

const createVerticalOptions = (position, tickSize, indentFromAxis) => {
  // Make *position* should be orientation agnostic - START or END.
  const isStart = position === LEFT;
  return {
    x1: 0,
    x2: isStart ? -tickSize : +tickSize,
    xText: isStart ? -indentFromAxis : +indentFromAxis,
    dominantBaseline: MIDDLE,
    textAnchor: isStart ? END : START,
  };
};

export const axisCoordinates = ({
  scale,
  orientation, // TODO: Replace it with *isHorizontal*.
  position,
  tickSize,
  tickFormat,
  indentFromAxis,
}) => {
  const isHorizontal = orientation === HORIZONTAL;
  const options = (isHorizontal ? createHorizontalOptions : createVerticalOptions)(
    position, tickSize, indentFromAxis,
  );
  const fixedScale = fixScaleOffset(scale);
  const formatTick = getFormat(scale, tickFormat);
  return getTicks(scale).map((tick, index) => {
    const coordinates = fixedScale(tick);
    return {
      key: index,
      x1: coordinates,
      x2: coordinates,
      y1: coordinates,
      y2: coordinates,
      xText: coordinates,
      yText: coordinates,
      text: formatTick(tick),
      ...options,
    };
  });
};

const horizontalGridOptions = { y: 0, dy: 1 };
const verticalGridOptions = { x: 0, dx: 1 };

export const getGridCoordinates = ({ name, scale }) => {
  const isHorizontal = name === ARGUMENT_DOMAIN;
  const options = isHorizontal ? horizontalGridOptions : verticalGridOptions;
  const fixedScale = fixScaleOffset(scale);
  return getTicks(scale).map((tick, index) => {
    const coordinates = fixedScale(tick);
    return {
      key: String(index),
      x: coordinates,
      y: coordinates,
      dx: 0,
      dy: 0,
      ...options,
    };
  });
};

export const axesData = (axes, axisProps) => [...axes, axisProps];
