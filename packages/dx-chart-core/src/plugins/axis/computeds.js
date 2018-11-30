import { isHorizontal, fixOffset } from '../../utils/scale';
import {
  LEFT, BOTTOM, MIDDLE, END, START,
} from '../../constants';

const getTicks = scale => (scale.ticks ? scale.ticks() : scale.domain());

const createTicks = (scale, callback) => {
  const fixedScale = fixOffset(scale);
  return getTicks(scale).map((tick, index) => callback(fixedScale(tick), String(index), tick));
};

const getFormat = (scale, tickFormat) => {
  if (scale.tickFormat) {
    return tickFormat ? tickFormat(scale) : scale.tickFormat();
  }
  return tick => tick;
};

const createHorizontalOptions = (position, tickSize, indentFromAxis) => {
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

const createVerticalOptions = (position, tickSize, indentFromAxis) => {
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

export const axisCoordinates = ({
  scaleName,
  scale,
  position,
  tickSize,
  tickFormat,
  indentFromAxis,
}) => {
  const isHor = isHorizontal(scaleName);
  const options = (isHor ? createHorizontalOptions : createVerticalOptions)(
    position, tickSize, indentFromAxis,
  );
  const formatTick = getFormat(scale, tickFormat);
  const ticks = createTicks(scale, (coordinates, key, tick) => ({
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
    sides: [Number(isHor), Number(!isHor)],
    ticks,
  };
};

const horizontalGridOptions = { y: 0, dy: 1 };
const verticalGridOptions = { x: 0, dx: 1 };

export const getGridCoordinates = ({ scaleName, scale }) => {
  const isHor = isHorizontal(scaleName);
  const options = isHor ? horizontalGridOptions : verticalGridOptions;
  return createTicks(scale, (coordinates, key) => ({
    key,
    x: coordinates,
    y: coordinates,
    dx: 0,
    dy: 0,
    ...options,
  }));
};
