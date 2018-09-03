import { createScale } from '../../utils/scale';
import {
  HORIZONTAL, TOP, LEFT, MIDDLE, END, START,
} from '../../constants';

const getTicks = scale => (scale.ticks ? scale.ticks() : scale.domain());
const getOffset = scale => (scale.bandwidth ? scale.bandwidth() / 2 : 0);
const getDominantBaseline = (orientation, position) => {
  if (orientation === HORIZONTAL) {
    return position === TOP ? 'baseline' : 'hanging';
  }
  return MIDDLE;
};
const getTextAnchor = (orientation, position) => {
  if (orientation === HORIZONTAL) {
    return MIDDLE;
  }
  return position === LEFT ? END : START;
};

const getFormat = (scale, tickFormat) => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale) : scale.tickFormat();
  }
  return tick => tick;
};

const calculateAxisCoordinates = (
  scale,
  orientation,
  position,
  tickSize,
  indentFromAxis,
  tickFormat,
) => {
  const ticks = getTicks(scale);
  const offset = getOffset(scale);
  const dominantBaseline = getDominantBaseline(orientation, position);
  const textAnchor = getTextAnchor(orientation, position);

  const getTickCoordinates = (tick) => {
    const coordinates = scale(tick) + offset;
    if (orientation === HORIZONTAL) {
      return {
        dominantBaseline,
        textAnchor,
        x1: coordinates,
        x2: coordinates,
        y1: position === TOP ? -tickSize : 0,
        y2: position === TOP ? 0 : tickSize,
        text: getFormat(scale, tickFormat)(tick),
        xText: coordinates,
        yText: position === TOP ? -tickSize - indentFromAxis : tickSize + indentFromAxis,
      };
    }
    return {
      dominantBaseline,
      textAnchor,
      y1: coordinates,
      y2: coordinates,
      x1: position === LEFT ? -tickSize : 0,
      x2: position === LEFT ? 0 : tickSize,
      text: getFormat(scale, tickFormat)(tick),
      xText: position === LEFT ? -tickSize - indentFromAxis : tickSize + indentFromAxis,
      yText: coordinates,
    };
  };
  return {
    ticks: ticks.map(getTickCoordinates),
  };
};

export const axisCoordinates = (
  domainOptions,
  position,
  width,
  height,
  tickSize,
  indentFromAxis,
  constructor,
) => {
  const scale = createScale(domainOptions, width, height, constructor);

  return calculateAxisCoordinates(
    scale,
    domainOptions.orientation,
    position,
    tickSize,
    indentFromAxis,
    domainOptions.tickFormat,
  );
};

export const axesData = (axes = [], axisProps) => [...axes, axisProps];
