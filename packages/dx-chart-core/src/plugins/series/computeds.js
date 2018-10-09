import {
  symbol,
  symbolCircle,
  line,
  curveMonotoneX,
  area,
  arc,
  pie,
} from 'd3-shape';
import jss from 'jss';
import { createScale, getWidth } from '../../utils/scale';

const getX = ({ x }) => x;
const getY = ({ y }) => y;
const getY1 = ({ y1 }) => y1;

const DEFAULT_POINT_SIZE = 7;

const getPieWidthHeight = ({ xScale, yScale }) => ({
  width: Math.max.apply(null, xScale.range()),
  height: Math.max.apply(null, yScale.range()),
});

export const dArea = area()
  .x(getX)
  .y1(getY)
  .y0(getY1);

export const dLine = line()
  .x(getX)
  .y(getY);

export const dSpline = line()
  .x(getX)
  .y(getY)
  .curve(curveMonotoneX);

const getConstructor = (scaleExtension, type) => scaleExtension.find(
  item => item.type === type,
).constructor;

export const xyScales = (
  argumentDomainOptions,
  valueDomainOptions,
  { width, height },
  groupWidth,
  scaleExtension,
) => {
  const xConstructor = getConstructor(scaleExtension, argumentDomainOptions.type);
  const yConstructor = getConstructor(scaleExtension, valueDomainOptions.type);
  return {
    xScale: createScale(argumentDomainOptions, width, height, xConstructor, 1 - groupWidth),
    yScale: createScale(valueDomainOptions, width, height, yConstructor),
  };
};

export const pieAttributes = (
  data,
  scales,
  {
    argumentField, valueField, innerRadius = 0, outerRadius = 1,
  },
) => {
  const { width, height } = getPieWidthHeight(scales);
  const radius = Math.min(width, height) / 2;
  const pieData = pie().sort(null).value(d => d[valueField])(data);

  return pieData.map(({
    startAngle, endAngle, value, data: itemData,
  }, index) => ({
    d: arc()
      .innerRadius(innerRadius * radius)
      .outerRadius(outerRadius * radius)
      .startAngle(startAngle)
      .endAngle(endAngle)(),
    value,
    data: itemData,
    id: itemData[argumentField],
    index,
    x: width / 2,
    y: height / 2,
  }));
};

export const coordinates = (
  data,
  { xScale, yScale },
  { argumentField, valueField },
) => {
  const y1 = yScale(0);
  return data.reduce((result, dataItem, index) => {
    if (dataItem[argumentField] !== undefined && dataItem[valueField] !== undefined) {
      return [...result, {
        x: xScale(dataItem[argumentField]) + getWidth(xScale) / 2,
        y: yScale(dataItem[valueField]),
        y1,
        id: index,
        index,
        value: dataItem[valueField],
      }];
    }
    return result;
  }, []);
};

export const barCoordinates = (
  data,
  { xScale, yScale },
  {
    argumentField, valueField, stack, barWidth = 0.9,
  },
  stacks = [undefined],
  scaleExtension,
) => {
  const rawCoordinates = coordinates(
    data,
    { xScale, yScale },
    { argumentField, valueField },
  );
  const width = getWidth(xScale);
  const x0Scale = createScale(
    {
      domain: stacks,
    },
    width,
    width,
    getConstructor(scaleExtension, 'band'),
    1 - barWidth,
  );
  return rawCoordinates.map(item => ({
    ...item,
    width: getWidth(x0Scale),
    x: item.x - width / 2 + x0Scale(stack),
  }));
};

export const findSeriesByName = (
  name, series,
) => series.find(seriesItem => seriesItem.symbolName === name);

export const dBar = ({
  x, y, y1, width,
}) => ({
  x, y: Math.min(y, y1), width: width || 2, height: Math.abs(y1 - y),
});

export const pointAttributes = ({ size = DEFAULT_POINT_SIZE }) => {
  const dPoint = symbol().size([size ** 2]).type(symbolCircle)();
  return item => ({
    d: dPoint,
    x: item.x,
    y: item.y,
  });
};

const createNewUniqueName = name => name.replace(/\d*$/, str => (str ? +str + 1 : 0));

export const seriesData = (series = [], seriesProps) => {
  if (series.find((({ uniqueName }) => uniqueName === seriesProps.uniqueName))) {
    return seriesData(
      series,
      { ...seriesProps, uniqueName: createNewUniqueName(seriesProps.uniqueName) },
    );
  }
  return [...series, seriesProps];
};

export const getPieItems = (series, domain) => domain.map(uniqueName => ({ uniqueName }));

export const getStartCoordinates = ({ yScale }) => ({ x: 0, y: yScale.copy().clamp(true)(0) });

export const getPieStartCoordinates = (scales) => {
  const { width, height } = getPieWidthHeight(scales);
  return {
    x: width / 2,
    y: height / 2,
  };
};

const setAnimationKeyframes = (frames, nameId) => {
  const styles = {
    [`@keyframes ${nameId}`]: frames,
  };
  jss.createStyleSheet(styles).attach();
};

const getId = name => `${name}_${Math.round(Math.random() * 100)}`;

export const scatterAnimation = () => {
  const name = getId('animation_scatter');
  setAnimationKeyframes({
    '0%': { opacity: 0 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  }, name);
  return {
    options: () => '1s',
    name,
  };
};

export const transformAnimation = () => {
  const name = getId('animation_transform');
  setAnimationKeyframes({
    from: { transform: 'scaleY(0)' },
  }, name);
  return {
    options: () => '1s',
    styles: (x, y) => ({ transformOrigin: `${x}px ${y}px` }),
    name,
  };
};

export const pieAnimation = () => {
  const name = getId('animation_pie');
  setAnimationKeyframes({
    from: { transform: 'scale(0)' },
  }, name);
  return {
    options: ({ index }) => `${(index + 1) * 0.2}s`,
    name,
  };
};
