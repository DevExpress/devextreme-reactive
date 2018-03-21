import { createScale } from '../../utils/scale';

export const xyScales = (domainsOptions, argumentAxisName, domainName, width, height) => ({
  xScale: createScale(domainsOptions[argumentAxisName], width, height),
  yScale: createScale(domainsOptions[domainName], width, height),
});
