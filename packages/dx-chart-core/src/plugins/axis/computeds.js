import { scaleLinear } from 'd3-scale';

const tickSize = 10;

const getAxisCoords = (scale, width, height, orientation) => {
  let getTickCoords;
  if (orientation === 'horizontal') {
    getTickCoords = (tick) => {
      const xCoords = scale(tick);
      return {
        x1: xCoords,
        x2: xCoords,
        y1: 0,
        y2: tickSize,
        text: tick,
        xText: xCoords,
        yText: 20,
      };
    };
  } else {
    getTickCoords = (tick) => {
      const yCoords = scale(tick);
      return {
        y1: yCoords,
        y2: yCoords,
        x1: 30,
        x2: 30 + tickSize,
        text: tick,
        xText: 15,
        yText: yCoords,
      };
    };
  }
  return {
    ticks: scale.ticks().map(getTickCoords),
  };
};

export const calculateAxisCoords = (domain, orientation, width, height) => {
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
  );
};
