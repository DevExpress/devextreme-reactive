import { scaleLinear } from 'd3-scale';

const tickSize = 10;

const getAxisCoords = (scale, width, height, orientation, position) => {
  let getTickCoords;
  if (orientation === 'horizontal') {
    getTickCoords = (tick) => {
      const xCoords = scale(tick);
      if (position === 'top') {
        return {
          alignmentBaseline: 'baseline',
          textAnchor: 'middle',
          x1: xCoords,
          x2: xCoords,
          y1: 0,
          y2: tickSize,
          text: tick,
          xText: xCoords,
          yText: 0,
        };
      }
      return {
        alignmentBaseline: 'hanging',
        textAnchor: 'middle',
        x1: xCoords,
        x2: xCoords,
        y1: 0,
        y2: -tickSize,
        text: tick,
        xText: xCoords,
        yText: 0,
      };
    };
  } else {
    getTickCoords = (tick) => {
      const yCoords = scale(tick);
      if (position === 'left') {
        return {
          alignmentBaseline: 'middle',
          textAnchor: 'end',
          y1: yCoords,
          y2: yCoords,
          x1: 0,
          x2: tickSize,
          text: tick,
          xText: 0,
          yText: yCoords,
        };
      }
      return {
        alignmentBaseline: 'middle',
        textAnchor: 'start',
        y1: yCoords,
        y2: yCoords,
        x1: 0,
        x2: -tickSize,
        text: tick,
        xText: 0,
        yText: yCoords,
      };
    };
  }
  return {
    ticks: scale.ticks().map(getTickCoords),
  };
};

export const calculateAxisCoords = (domain, orientation, position, width, height) => {
  const scale = scaleLinear()
    .domain(domain)
    .range(orientation === 'horizontal'
      ? [0, width]
      : [height, 0]);

  return getAxisCoords(
    scale,
    width,
    height,
    orientation,
    position,
  );
};
