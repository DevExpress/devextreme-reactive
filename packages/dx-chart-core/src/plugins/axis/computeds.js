import { scaleLinear } from 'd3-scale';

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
    ticks: scale.ticks().map(getTickCoordinates),
  };
};

export const axisCoordinates = (domain, orientation, position, width, height) => {
  const scale = scaleLinear()
    .domain(domain)
    .range(orientation === 'horizontal'
      ? [0, width]
      : [height, 0]);

  return calculateAxisCoordinates(
    scale,
    width,
    height,
    orientation,
    position,
  );
};
