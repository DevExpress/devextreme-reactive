import { createScale } from '../../utils/scale';

const getTicks = scale => (scale.ticks ? scale.ticks() : scale.domain());
const getOffset = scale => (scale.bandwidth ? scale.bandwidth() / 2 : 0);
const getDominantBaseline = (orientation, position) => {
  if (orientation === 'horizontal') {
    return position === 'top' ? 'baseline' : 'hanging';
  }
  return 'middle';
};
const getTextAnchor = (orientation, position) => {
  if (orientation === 'horizontal') {
    return 'middle';
  }
  return position === 'left' ? 'end' : 'start';
};


const calculateAxisCoordinates = (scale, width, height, orientation, position, tickSize) => {
  const ticks = getTicks(scale);
  const offset = getOffset(scale);
  const dominantBaseline = getDominantBaseline(orientation, position);
  const textAnchor = getTextAnchor(orientation, position);

  const getTickCoordinates = (tick) => {
    const coordinates = scale(tick) + offset;
    if (orientation === 'horizontal') {
      return {
        dominantBaseline,
        textAnchor,
        x1: coordinates,
        x2: coordinates,
        y1: 0,
        y2: position === 'top' ? tickSize : -tickSize,
        text: tick,
        xText: coordinates,
        yText: 0,
      };
    }
    return {
      dominantBaseline,
      textAnchor,

      y1: coordinates,
      y2: coordinates,
      x1: 0,
      x2: position === 'left' ? tickSize : -tickSize,
      text: tick,
      xText: 0,
      yText: coordinates,
    };
  };
  return {
    ticks: ticks.map(getTickCoordinates),
  };
};

export const axisCoordinates = (domainOptions, position, width, height, tickSize) => {
  const scale = createScale(domainOptions, width, height);

  return calculateAxisCoordinates(
    scale,
    width,
    height,
    domainOptions.orientation,
    position,
    tickSize,
  );
};
