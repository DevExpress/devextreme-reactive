import { stack } from 'd3-shape';
import { scaleBand } from 'd3-scale';
import { PureComputed } from '@devexpress/dx-core';
import {
  SeriesList, Series, PointList, Point, GetPointTransformerFn, DataItems, DomainItems,
  StackList, GetPointTransformerFnRaw, BarPoint,
} from '../../types';

interface StackedPoint extends Point {
  readonly value0: any;
}

type StackData = ReadonlyArray<ReadonlyArray<number>>;

type OrderFn = (series: StackData) => number[];
type OffsetFn = (series: StackData, order: number[]) => void;

type StackMap = {
  readonly [series: string]: number;
};
type StacksKeys = {
  [stackId: number]: string[];
};
type SeriesPositions = {
  [name: string]: number;
};
type StackedDataItem = Readonly<[any, any]>;
type StackedDataItems = ReadonlyArray<StackedDataItem>;
type StackedData = {
  readonly [stackId: number]: {
    readonly [seriesPosition: number]: StackedDataItems;
  };
};

// "Stack" plugin relies on "data" and "series" getters and
// knowledge about "getPointTransformer" and "path" functions behavior.
const buildSeriesToStackMap = (stacks: StackList): StackMap => {
  const result = {};
  stacks.forEach(({ series }, i) => {
    series.forEach((name) => {
      result[name] = i;
    });
  });
  return result;
};

const getStackedPointTransformer = (getPointTransformer: GetPointTransformerFn) => {
  const wrapper: GetPointTransformerFnRaw = (series) => {
    const transform = getPointTransformer(series);
    const { valueScale } = series;
    return (point: Point) => {
      const ret = transform(point);
      return {
        ...ret,
        y1: valueScale((point as StackedPoint).value0),
      };
    };
  };
  // Preserve static fields of original transformer.
  Object.assign(wrapper, getPointTransformer);
  return wrapper as GetPointTransformerFn;
};

// TODO: Temporary - see corresponding note in *computeDomains*.
const getValueDomain = (points: PointList): DomainItems => {
  const items: any[] = [];
  points.forEach((point) => {
    items.push(point.value, (point as StackedPoint).value0);
  });
  return items;
};

const collectStacks = (
  seriesList: SeriesList, seriesToStackMap: StackMap,
  stacksKeys: StacksKeys, seriesPositions: SeriesPositions,
) => {
  seriesList.forEach(({ name, valueField }) => {
    const stackId = seriesToStackMap[name];
    if (stackId === undefined) {
      return;
    }

    if (!stacksKeys[stackId]) {
      stacksKeys[stackId] = [];
    }
    seriesPositions[name] = stacksKeys[stackId].length;
    stacksKeys[stackId].push(valueField);
  });
  // Stack cannot consist of single series.
  Object.keys(stacksKeys).forEach((stackId) => {
    if (stacksKeys[stackId].length === 1) {
      delete stacksKeys[stackId];
    }
  });
};

const getStackedData = (
  stacksKeys: StacksKeys, dataItems: DataItems, offset: OffsetFn, order: OrderFn,
): StackedData => {
  const result = {};
  Object.keys(stacksKeys).forEach((stackId) => {
    result[stackId] = stack().keys(stacksKeys[stackId])
      .order(order as any)
      .offset(offset as any)(dataItems as any);
  });
  return result;
};

const buildStackedSeries = (series: Series, dataItems: StackedDataItems): Series => {
  const points = series.points.map((point) => {
    const [value0, value] = dataItems[point.index];
    return { ...point, value, value0 };
  });
  const stackedSeries = {
    ...series,
    points,
  };
  if (series.getPointTransformer.isStartedFromZero) {
    stackedSeries.getPointTransformer = getStackedPointTransformer(series.getPointTransformer);
    stackedSeries.getValueDomain = getValueDomain;
  }
  return stackedSeries;
};

const applyStacking = (
  seriesList: SeriesList, dataItems: DataItems, seriesToStackMap: StackMap,
  offset: OffsetFn, order: OrderFn,
): SeriesList => {
  const stacksKeys: StacksKeys = {};
  const seriesPositions: SeriesPositions = {};
  collectStacks(seriesList, seriesToStackMap, stacksKeys, seriesPositions);
  if (Object.keys(stacksKeys).length === 0) {
    return seriesList;
  }
  const stackedData = getStackedData(stacksKeys, dataItems, offset, order);
  return seriesList.map((seriesItem) => {
    const stackId = seriesToStackMap[seriesItem.name];
    const stackData = stackedData[stackId];
    if (!stackData) {
      return seriesItem;
    }
    const position = seriesPositions[seriesItem.name];
    return buildStackedSeries(seriesItem, stackData[position]);
  });
};

const getGroupName = (series: Series, i: number, seriesToStackMap: StackMap) => {
  const stackId = seriesToStackMap[series.name];
  return stackId >= 0 ? String(stackId) : `group-${i}`;
};

const getGroupedPointTransformer = (
  getPointTransformer: GetPointTransformerFn, groupCount: number, groupOffset: number,
) => {
  const wrapper: GetPointTransformerFnRaw = (series) => {
    const transform = getPointTransformer(series);
    const widthCoeff = 1 / groupCount;
    return (point) => {
      const original = transform(point) as BarPoint;
      const result: BarPoint = {
        ...original,
        x: original.x - original.maxBarWidth * (0.5 - 0.5 * widthCoeff - groupOffset * widthCoeff),
        maxBarWidth: original.maxBarWidth / groupCount,
      };
      return result;
    };
  };
  // Preserve static fields of original transformer.
  Object.assign(wrapper, getPointTransformer);
  return wrapper as GetPointTransformerFn;
};

const applyGrouping = (seriesList: SeriesList, seriesToStackMap: StackMap): SeriesList => {
  const groups = new Set();
  seriesList.forEach((seriesItem, i) => {
    if (seriesItem.getPointTransformer.isBroad) {
      groups.add(getGroupName(seriesItem, i, seriesToStackMap));
    }
  });
  // There cannot be single group.
  if (groups.size < 2) {
    return seriesList;
  }
  const scale = scaleBand().domain(Array.from(groups)).range([0, groups.size]);
  return seriesList.map((seriesItem, i) => {
    if (!seriesItem.getPointTransformer.isBroad) {
      return seriesItem;
    }
    const getPointTransformer = getGroupedPointTransformer(
      seriesItem.getPointTransformer,
      groups.size,
      scale(getGroupName(seriesItem, i, seriesToStackMap))!,
    );
    return {
      ...seriesItem,
      getPointTransformer,
    };
  });
};

type StacksOptions = {
  readonly stacks: StackList;
  readonly offset: OffsetFn;
  readonly order: OrderFn;
};

type GetStackedSeries = PureComputed<[SeriesList, DataItems, StacksOptions]>;
export const getStackedSeries: GetStackedSeries = (
  seriesList, dataItems, { stacks, offset, order },
) => {
  const map = buildSeriesToStackMap(stacks);
  const stackedSeriesList = applyStacking(seriesList, dataItems, map, offset, order);
  const groupedSeriesList = applyGrouping(stackedSeriesList, map);
  return groupedSeriesList;
};
