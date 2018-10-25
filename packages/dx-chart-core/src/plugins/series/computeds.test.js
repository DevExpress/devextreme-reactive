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
  findSeriesByName,
  addSeries,
  pointAttributes,
  dBar,
  getAreaPointTransformer,
  getBarPointTransformer,
  getPiePointTransformer,
  scaleSeriesPoints,
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
      argument: 'arg',
      value: 'val',
      index: 1,
      x: 14,
      y: 9,
      y1: 4,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
  });
});

describe('getBarPointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(11);
    argumentScale.bandwidth = () => 20;
    const valueScale = jest.fn();
    valueScale.mockReturnValueOnce(4);
    valueScale.mockReturnValueOnce(9);

    const transform = getBarPointTransformer({
      barWidth: 0.4, argumentScale, valueScale,
    });
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 }),
    ).toEqual({
      argument: 'arg',
      value: 'val',
      index: 1,
      x: 17,
      y: 9,
      y1: 4,
      width: 8,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
  });

  it('should be marked with *isBroad* flag', () => {
    expect(getBarPointTransformer.isBroad).toEqual(true);
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
      points: 'test-points',
    });

    expect(
      transform({ argument: 'arg-1', value: 'val-1', index: 1 }),
    ).toEqual({
      argument: 'arg-1',
      value: 'val-1',
      index: 1,
      x: 25,
      y: 20,
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
      argument: 'arg-2',
      value: 'val-2',
      index: 3,
      x: 25,
      y: 20,
      color: 'c2',
      d: 'test-arc-2',
      innerRadius: 4,
      outerRadius: 6,
      startAngle: 7,
      endAngle: 8,
    });

    expect(mockPie.sort).toBeCalledWith(null);
    expect(mockPie.value).toBeCalledWith(expect.any(Function));
    expect(mockPie).toBeCalledWith('test-points');

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
      [{ uniqueName: 's1' }, { uniqueName: 's2' }], [], palette, { name: 'test' },
    );
    expect(result).toEqual([
      { uniqueName: 's1' },
      { uniqueName: 's2' },
      {
        name: 'test',
        uniqueName: 'test',
        points: [],
        color: 'c3',
        palette,
      },
    ]);
  });

  it('should generate unique name prop', () => {
    const result = addSeries([{ uniqueName: 'test' }], [], palette, { name: 'test' });
    expect(result).toEqual([
      { uniqueName: 'test' },
      expect.objectContaining({ uniqueName: 'test0' }),
    ]);
  });

  it('should attempt to generate unique name several times', () => {
    const result = addSeries(
      [{ uniqueName: 'test1' }, { uniqueName: 'test2' }, { uniqueName: 'test3' }],
      [], palette, { name: 'test1' },
    );
    expect(result[3].uniqueName).toEqual('test4');
  });

  it('should take color from palette and favor own series color', () => {
    let result = [{ uniqueName: 's1' }, { uniqueName: 's2' }];
    result = addSeries(result, [], palette, { name: 't1' });
    result = addSeries(result, [], palette, { name: 't2', color: 'red' });
    result = addSeries(result, [], palette, { name: 't3' });

    expect(result[2].color).toEqual('c3');
    expect(result[3].color).toEqual('red');
    expect(result[4].color).toEqual('c2');
  });

  it('should create points', () => {
    const props = {
      name: 'test',
      argumentField: 'arg',
      valueField: 'val',
    };
    const data = [
      { arg: 'a', val: 1 },
      { arg: 'b', val: 2 },
      { val: 3 },
      { arg: 'd', val: 4 },
      { arg: 'e' },
    ];
    const result = addSeries([{ uniqueName: 's1' }], data, palette, props);
    expect(result).toEqual([
      { uniqueName: 's1' },
      {
        ...props,
        uniqueName: 'test',
        points: [
          { argument: 'a', value: 1, index: 0 },
          { argument: 'b', value: 2, index: 1 },
          { argument: 'd', value: 4, index: 3 },
        ],
        color: 'c2',
        palette,
      },
    ]);
  });
});

describe('scaleSeriesPoints', () => {
  it('should update points', () => {
    const scales = {
      'argument-domain': 'test-arg-scale',
      'value-domain': 'test-val-scale',
      'domain-1': 'test-val-scale-1',
    };
    const getPointTransformer1 = jest.fn()
      .mockReturnValue(point => ({ ...point, tag: '#1' }));
    const getPointTransformer2 = jest.fn()
      .mockReturnValue(point => ({ ...point, tag: '#2' }));
    const series1 = {
      axisName: 'domain-1',
      getPointTransformer: getPointTransformer1,
      points: [{ name: 'a1' }, { name: 'a2' }],
    };
    const series2 = {
      getPointTransformer: getPointTransformer2,
      points: [{ name: 'b1' }, { name: 'b2' }, { name: 'b3' }],
    };

    const result = scaleSeriesPoints([series1, series2], scales);

    expect(result[0].points).toEqual(
      [{ name: 'a1', tag: '#1' }, { name: 'a2', tag: '#1' }],
    );
    expect(result[1].points).toEqual(
      [{ name: 'b1', tag: '#2' }, { name: 'b2', tag: '#2' }, { name: 'b3', tag: '#2' }],
    );
    expect(getPointTransformer1).toBeCalledWith(
      { ...series1, argumentScale: 'test-arg-scale', valueScale: 'test-val-scale-1' },
    );
    expect(getPointTransformer2).toBeCalledWith(
      { ...series2, argumentScale: 'test-arg-scale', valueScale: 'test-val-scale' },
    );
  });
});
