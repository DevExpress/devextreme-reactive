import { getWidth } from '../../utils/scale';
import {
  HORIZONTAL, TOP, LEFT, MIDDLE, END, START,
} from '../../constants';

const getTicks = scale => (scale.ticks ? scale.ticks() : scale.domain());
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

// It is called for grid (which do not have labels) - how is it handled here?
const calculateAxisCoordinates = (
  scale,
  orientation,
  position,
  tickSize,
  indentFromAxis,
  tickFormat,
) => {
  const ticks = getTicks(scale);
  const offset = getWidth(scale) / 2;
  const dominantBaseline = getDominantBaseline(orientation, position);
  const textAnchor = getTextAnchor(orientation, position);
  const getTickCoordinates = (tick, index) => {
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
        yText: position === TOP ? -indentFromAxis : indentFromAxis,
        key: index,
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
      xText: position === LEFT ? -indentFromAxis : indentFromAxis,
      yText: coordinates,
      key: index,
    };
  };
  return {
    ticks: ticks.map(getTickCoordinates),
  };
};

export const axisCoordinates = (
  domain,
  scale,
  position,
  tickSize,
  indentFromAxis,
) => calculateAxisCoordinates(
  scale,
  domain.orientation,
  position,
  tickSize,
  indentFromAxis,
  // TODO: *tickFormat* belongs to axis rather then domain - take it from axis.
  domain.tickFormat,
);

export const axesData = (axes, axisProps) => [...axes, axisProps];
