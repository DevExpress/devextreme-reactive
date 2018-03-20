import { createScale } from '../../utils/scale';

const tickSize = 10;

const calculateAxisCoordinates = (scale, width, height, orientation, position) => {
  let getTickCoordinates;
  if (orientation === 'horizontal') {
    getTickCoordinates = (tick) => {
      const xCoordinates = scale(tick);
      if (position === 'top') {
        return {
          alignmentBaseline: 'baseline',
          textAnchor: 'middle',
          x1: xCoordinates,
          x2: xCoordinates,
          y1: 0,
          y2: tickSize,
          text: tick,
          xText: xCoordinates,
          yText: 0,
        };
      }
      return {
        alignmentBaseline: 'hanging',
        textAnchor: 'middle',
        x1: xCoordinates,
        x2: xCoordinates,
        y1: 0,
        y2: -tickSize,
        text: tick,
        xText: xCoordinates,
        yText: 0,
      };
    };
  } else {
    getTickCoordinates = (tick) => {
      const yCoordinates = scale(tick);
      if (position === 'left') {
        return {
          alignmentBaseline: 'middle',
          textAnchor: 'end',
          y1: yCoordinates,
          y2: yCoordinates,
          x1: 0,
          x2: tickSize,
          text: tick,
          xText: 0,
          yText: yCoordinates,
        };
      }
      return {
        alignmentBaseline: 'middle',
        textAnchor: 'start',
        y1: yCoordinates,
        y2: yCoordinates,
        x1: 0,
        x2: -tickSize,
        text: tick,
        xText: 0,
        yText: yCoordinates,
      };
    };
  }
  return {
    ticks: scale.ticks ?
      scale.ticks().map(getTickCoordinates)
      : scale.domain().filter(item => (!!item)).map(getTickCoordinates),
  };
};

export const axisCoordinates = (domainOptions, position, width, height) => {
  const scale = createScale(domainOptions, width, height);

  return calculateAxisCoordinates(
    scale,
    width,
    height,
    domainOptions.orientation,
    position,
  );
};
