export type AxisCoordinatesFn = {
  scaleName: string,
  scale: () => {},
  position: string,
  tickSize: number,
  indentFromAxis: number,
  tickFormat?: () => {},
};

export type TargetElement = {
  x: number,
  y: number,
  point?: any,
};
