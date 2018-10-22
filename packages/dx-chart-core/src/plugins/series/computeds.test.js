import { scaleOrdinal } from 'd3-scale';
import {
  symbol,
  symbolCircle,
  curveCatmullRom,
  area,
  line,
  arc,
  pie,
} from 'd3-shape';
import {
  getSeriesPoints,
  findSeriesByName,
  addSeries,
  pointAttributes,
  dBar,
  getAreaPointTransformer,
  getBarPointTransformer,
  getPiePointTransformer,
} from './computeds';

jest.mock('d3-scale', () => ({
  scaleIdentity: () => x => x,
  scaleOrdinal: jest.fn(),
}));

jest.mock('d3-shape', () => {
  const createMockWithFluentInterface = () => {
    const proxy = new Proxy(jest.fn().mockReturnValue('symbol path'), {
      get(target, prop, receiver) {
        if (target[prop] === undefined) {
          const mock = target[prop] || jest.fn().mockReturnValue(receiver);
          // eslint-disable-next-line no-param-reassign
          target[prop] = mock;
        }
        return target[prop];
      },
    });
    return jest.fn().mockReturnValue(proxy);
  };

  return {
    area: createMockWithFluentInterface(),
    line: createMockWithFluentInterface(),
    symbol: createMockWithFluentInterface(),
    pie: createMockWithFluentInterface(),
    arc: createMockWithFluentInterface(),
  };
});

describe('dArea', () => {
  it('init function', () => {
    expect(area).toHaveBeenCalledTimes(1);
  });

  it('x getter', () => {
    const fluentArea = area.mock.results[0].value;
    const getX = fluentArea.x.mock.calls[0][0];

    expect(fluentArea.x).toHaveBeenCalledTimes(1);
    expect(getX({ x: 10 })).toEqual(10);
  });

  it('y1 getter', () => {
    const fluentArea = area.mock.results[0].value;
    const getY = fluentArea.y1.mock.calls[0][0];

    expect(fluentArea.y1).toHaveBeenCalledTimes(1);
    expect(getY({ y: 10 })).toEqual(10);
  });

  it('y0 getter', () => {
    const fluentArea = area.mock.results[0].value;
    const getY = fluentArea.y0.mock.calls[0][0];

    expect(fluentArea.y0).toHaveBeenCalledTimes(1);
    expect(getY({ y1: 5 })).toEqual(5);
  });
});

describe('line & spline', () => {
  it('init function', () => {
    expect(line).toHaveBeenCalledTimes(2);
  });

  it('x & y  getters', () => {
    const fluentLine = line.mock.results[0].value;
    expect(fluentLine.x).toHaveBeenCalledTimes(2);
    expect(fluentLine.y).toHaveBeenCalledTimes(2);
  });

  describe('dLine', () => {
    it('x getter', () => {
      const getX = line.mock.results[0].value.x.mock.calls[0][0];

      expect(getX({ x: 10 })).toEqual(10);
    });

    it('y1 getter', () => {
      const getY = line.mock.results[0].value.y.mock.calls[0][0];

      expect(getY({ y: 10 })).toEqual(10);
    });
  });

  describe('dSpline', () => {
    it('x getter', () => {
      const getX = line.mock.results[0].value.x.mock.calls[1][0];

      expect(getX({ x: 10 })).toEqual(10);
    });

    it('y1 getter', () => {
      const getY = line.mock.results[0].value.y.mock.calls[1][0];

      expect(getY({ y: 10 })).toEqual(10);
    });

    it('curve', () => {
      const curve = line.mock.results[0].value.curve.mock.calls[0][0];

      expect(curve).toEqual(curveCatmullRom);
    });
  });
});

describe('getSeriesPoints', () => {
  const transform = jest.fn(point => ({ ...point, tag: 'transformed' }));
  const getPointTransformer = jest.fn().mockReturnValue(transform);
  const series = { argumentField: 'arg', valueField: 'val', getPointTransformer };

  afterEach(jest.clearAllMocks);

  it('should create points from data', () => {
    const dataItems = [
      { arg: 'a', val: 1 }, { arg: 'b' }, { arg: 'c', val: 3 }, { val: 4 }, { arg: 'e', val: 5 },
    ];
    const scales = {
      'argument-domain': 'test-arg-scale',
      'value-domain': 'test-val-scale',
    };
    const points = getSeriesPoints(series, dataItems, scales, 'r1', 'r2');

    expect(points).toEqual([
      {
        argument: 'a', value: 1, index: 0, tag: 'transformed',
      },
      {
        argument: 'c', value: 3, index: 2, tag: 'transformed',
      },
      {
        argument: 'e', value: 5, index: 4, tag: 'transformed',
      },
    ]);
    expect(getPointTransformer).toBeCalledWith({
      ...series,
      argumentScale: 'test-arg-scale',
      valueScale: 'test-val-scale',
    }, dataItems, scales, 'r1', 'r2');
    expect(transform.mock.calls).toEqual([
      [{ argument: 'a', value: 1, index: 0 }],
      [{ argument: 'c', value: 3, index: 2 }],
      [{ argument: 'e', value: 5, index: 4 }],
    ]);
  });

  it('should take value scale from "axisName"', () => {
    const dataItems = [{ arg: 'a', val: 1 }, { arg: 'b', val: 2 }];
    const scales = {
      'argument-domain': 'test-arg-scale',
      'test-domain-1': 'test-val-scale',
    };
    getSeriesPoints({ ...series, axisName: 'test-domain-1' }, dataItems, scales);

    expect(getPointTransformer).toBeCalledWith({
      ...series,
      axisName: 'test-domain-1',
      argumentScale: 'test-arg-scale',
      valueScale: 'test-val-scale',
    }, dataItems, scales);
  });

  it('should be callable without scales', () => {
    const dataItems = [{ arg: 'a', val: 1 }, { arg: 'b', val: 2 }];
    getSeriesPoints(series, dataItems);

    expect(getPointTransformer).toBeCalledWith({
      ...series,
      argumentScale: expect.any(Function),
      valueScale: expect.any(Function),
    }, dataItems, undefined);
  });
});

describe('getAreaPointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(10);
    argumentScale.bandwidth = () => 8;
    const valueScale = jest.fn();
    valueScale.mockReturnValueOnce(4);
    valueScale.mockReturnValueOnce(9);

    const transform = getAreaPointTransformer({ argumentScale, valueScale });
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 }),
    ).toEqual({
      x: 14,
      y: 9,
      y1: 4,
      id: 1,
      value: 'val',
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
  });
});

describe('getBarPointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(10);
    argumentScale.bandwidth = () => 8;
    const valueScale = jest.fn();
    valueScale.mockReturnValueOnce(4);
    valueScale.mockReturnValueOnce(9);
    const groupScale = jest.fn().mockReturnValue(7);
    groupScale.bandwidth = () => 12;
    groupScale.domain = jest.fn().mockReturnValue(groupScale);
    groupScale.range = jest.fn().mockReturnValue(groupScale);
    groupScale.paddingInner = jest.fn().mockReturnValue(groupScale);
    groupScale.paddingOuter = jest.fn().mockReturnValue(groupScale);

    const transform = getBarPointTransformer(
      {
        barWidth: 0.4, stack: 'stack-1', argumentScale, valueScale,
      },
      'test-data', 'test-scales',
      'test-stacks', [{ type: 'band', constructor: () => groupScale }],
    );
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 }),
    ).toEqual({
      x: 17,
      y: 9,
      y1: 4,
      id: 1,
      value: 'val',
      width: 12,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
    expect(groupScale).toBeCalledWith('stack-1');
    expect(groupScale.domain).toBeCalledWith('test-stacks');
    expect(groupScale.range).toBeCalledWith([8, 0]);
    expect(groupScale.paddingInner).toBeCalledWith(0.6);
    expect(groupScale.paddingOuter).toBeCalledWith(0.3);
  });
});

describe('getPiePointTransformer', () => {
  afterEach(jest.clearAllMocks);

  it('should return data', () => {
    const mockPie = jest.fn().mockReturnValue([
      { startAngle: 1, endAngle: 2 },
      { startAngle: 3, endAngle: 4 },
      { startAngle: 5, endAngle: 6 },
      { startAngle: 7, endAngle: 8 },
    ]);
    mockPie.sort = jest.fn().mockReturnValue(mockPie);
    mockPie.value = jest.fn().mockReturnValue(mockPie);
    pie.mockReturnValue(mockPie);

    const mockArc = jest.fn();
    mockArc.innerRadius = jest.fn().mockReturnValue(mockArc);
    mockArc.outerRadius = jest.fn().mockReturnValue(mockArc);
    mockArc.startAngle = jest.fn().mockReturnValue(mockArc);
    mockArc.endAngle = jest.fn().mockReturnValue(mockArc);
    mockArc.mockReturnValueOnce('test-arc-1');
    mockArc.mockReturnValueOnce('test-arc-2');
    arc.mockReturnValue(mockArc);

    const colorScale = jest.fn();
    colorScale.range = jest.fn().mockReturnValue(colorScale);
    colorScale.mockReturnValueOnce('c1');
    colorScale.mockReturnValueOnce('c2');
    scaleOrdinal.mockReturnValue(colorScale);

    const argumentScale = { range: () => [0, 50] };
    const valueScale = { range: () => [40, 0] };
    const transform = getPiePointTransformer({
      argumentScale,
      valueScale,
      innerRadius: 0.2,
      outerRadius: 0.3,
      valueField: 'val',
      palette: 'test-palette',
    }, 'test-data');

    expect(
      transform({ argument: 'arg-1', value: 'val-1', index: 1 }),
    ).toEqual({
      x: 25,
      y: 20,
      id: 'arg-1',
      value: 'val-1',
      color: 'c1',
      d: 'test-arc-1',
      innerRadius: 4,
      outerRadius: 6,
      startAngle: 3,
      endAngle: 4,
    });
    expect(
      transform({ argument: 'arg-2', value: 'val-2', index: 3 }),
    ).toEqual({
      x: 25,
      y: 20,
      id: 'arg-2',
      value: 'val-2',
      color: 'c2',
      d: 'test-arc-2',
      innerRadius: 4,
      outerRadius: 6,
      startAngle: 7,
      endAngle: 8,
    });

    expect(mockPie.sort).toBeCalledWith(null);
    expect(mockPie.value).toBeCalledWith(expect.any(Function));
    expect(mockPie).toBeCalledWith('test-data');

    expect(mockArc.innerRadius).toBeCalledWith(4);
    expect(mockArc.outerRadius).toBeCalledWith(6);
    expect(mockArc.startAngle.mock.calls).toEqual([
      [3],
      [7],
    ]);
    expect(mockArc.endAngle.mock.calls).toEqual([
      [4],
      [8],
    ]);
    expect(mockArc.mock.calls).toEqual([
      [],
      [],
    ]);

    expect(colorScale.range).toBeCalledWith('test-palette');
    expect(colorScale.mock.calls).toEqual([
      [1],
      [3],
    ]);
  });
});

describe('findSeriesByName', () => {
  it('should return series by name', () => {
    const symbolName = Symbol('Series 2');
    const series = [{ symbolName: Symbol('Series 1') }, { symbolName }, { symbolName: Symbol('Series 3') }];

    expect(findSeriesByName(symbolName, series)).toEqual(series[1]);
    expect(findSeriesByName(Symbol('test'), series)).toEqual(undefined);
  });
});

describe('pointAttributes', () => {
  afterEach(jest.clearAllMocks);

  it('should return d attribute for point and coordinates', () => {
    const createPoint = pointAttributes({ size: 3 });
    const result = createPoint({ x: 1, y: 2 });

    expect(result).toEqual({
      x: 1,
      y: 2,
      d: 'symbol path',
    });
    expect(symbol.mock.results[0].value.size).toBeCalledWith([9]);
    expect(symbol.mock.results[0].value.type).toBeCalledWith(symbolCircle);
  });
});

describe('dBar', () => {
  it('should return bar coordinates', () => {
    expect(dBar({
      x: 1, y: 9, y1: 5, width: 3,
    })).toEqual({
      x: 1, y: 5, width: 3, height: 4,
    });
    expect(dBar({
      x: 1, y: 5, y1: 9, width: 3,
    })).toEqual({
      x: 1, y: 5, width: 3, height: 4,
    });
  });
});

describe('addSeries', () => {
  const palette = ['c1', 'c2', 'c3'];

  it('should append element to list', () => {
    const result = addSeries(
      [{ uniqueName: 's1' }, { uniqueName: 's2' }], palette, { name: 'test' },
    );
    expect(result).toEqual([
      { uniqueName: 's1' },
      { uniqueName: 's2' },
      {
        name: 'test',
        uniqueName: 'test',
        color: 'c3',
        palette,
      },
    ]);
  });

  it('should generate unique name prop', () => {
    const result = addSeries([{ uniqueName: 'test' }], palette, { name: 'test' });
    expect(result).toEqual([
      { uniqueName: 'test' },
      expect.objectContaining({ uniqueName: 'test0' }),
    ]);
  });

  it('should attempt to generate unique name several times', () => {
    const result = addSeries(
      [{ uniqueName: 'test1' }, { uniqueName: 'test2' }, { uniqueName: 'test3' }],
      palette, { name: 'test1' },
    );
    expect(result[3].uniqueName).toEqual('test4');
  });

  it('should take color from palette and favor own series color', () => {
    let result = [{ uniqueName: 's1' }, { uniqueName: 's2' }];
    result = addSeries(result, palette, { name: 't1' });
    result = addSeries(result, palette, { name: 't2', color: 'red' });
    result = addSeries(result, palette, { name: 't3' });

    expect(result[2].color).toEqual('c3');
    expect(result[3].color).toEqual('red');
    expect(result[4].color).toEqual('c2');
  });
});
