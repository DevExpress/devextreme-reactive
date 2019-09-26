import {
  symbol,
  symbolCircle,
  area,
  line,
  arc,
  pie,
} from 'd3-shape';
import {
  findSeriesByName,
  addSeries,
  dSymbol,
  dPie,
  dBar,
  getAreaPointTransformer,
  getScatterPointTransformer,
  getLinePointTransformer,
  getBarPointTransformer,
  getPiePointTransformer,
  scaleSeriesPoints,
  getVisibility,
  adjustBarSize,
} from './computeds';

jest.mock('d3-scale', () => ({
  scaleIdentity: () => x => x,
  scaleOrdinal: jest.fn(),
}));

jest.mock('d3-shape', () => {
  const createMockWithFluentInterface = () => jest.fn(() => {
    const proxy = new Proxy(jest.fn().mockReturnValue('symbol path'), {
      get(target, prop, receiver) {
        if (target[prop] === undefined) {
          const mock = target[prop] || jest.fn().mockReturnValue(receiver);
          target[prop] = mock;
        }
        return target[prop];
      },
    });
    return proxy;
  });

  return {
    area: createMockWithFluentInterface(),
    line: createMockWithFluentInterface(),
    symbol: createMockWithFluentInterface(),
    pie: createMockWithFluentInterface(),
    arc: createMockWithFluentInterface(),
    curveMonotoneX: '#curve-monotone-x',
    curveMonotoneY: '#curve-monotone-y',
  };
});

const mockSymbol = jest.fn().mockReturnValue('symbol path') as any;
mockSymbol.size = jest.fn().mockReturnValue(mockSymbol);
mockSymbol.type = jest.fn().mockReturnValue(mockSymbol);
(symbol as jest.Mock).mockReturnValue(mockSymbol);

const mockArc = jest.fn().mockReturnValue('test-d') as any;
mockArc.centroid = jest.fn().mockReturnValue([2, 3]);
(arc as jest.Mock).mockReturnValue(mockArc);

describe('dFunctions', () => {
  it('init functions', () => {
    expect(area).toHaveBeenCalledTimes(2);
    expect(line).toHaveBeenCalledTimes(4);
  });

  it('dArea', () => {
    const fluentArea = (area as any).mock.results[0].value;
    const getX = fluentArea.x.mock.calls[0][0];
    const getY0 = fluentArea.y0.mock.calls[0][0];
    const getY1 = fluentArea.y1.mock.calls[0][0];

    expect(fluentArea.x).toHaveBeenCalledTimes(1);
    expect(fluentArea.y1).toHaveBeenCalledTimes(1);
    expect(fluentArea.y0).toHaveBeenCalledTimes(1);

    expect(getX({ arg: 10 })).toEqual(10);
    expect(getY1({ val: 10 })).toEqual(10);
    expect(getY0({ startVal: 7 })).toEqual(7);
  });

  it('dRotateArea', () => {
    const fluentArea = (area as any).mock.results[1].value;
    const getX0 = fluentArea.x0.mock.calls[0][0];
    const getY1 = fluentArea.x1.mock.calls[0][0];
    const getY = fluentArea.y.mock.calls[0][0];

    expect(fluentArea.x0).toHaveBeenCalledTimes(1);
    expect(fluentArea.x1).toHaveBeenCalledTimes(1);
    expect(fluentArea.y).toHaveBeenCalledTimes(1);

    expect(getX0({ val: 7 })).toEqual(7);
    expect(getY1({ startVal: 10 })).toEqual(10);
    expect(getY({ arg: 5 })).toEqual(5);
  });

  it('dLine', () => {
    const fluentLine = (line as any).mock.results[0].value;
    const getX = fluentLine.x.mock.calls[0][0];
    const getY = fluentLine.y.mock.calls[0][0];

    expect(fluentLine.x).toHaveBeenCalledTimes(1);
    expect(fluentLine.y).toHaveBeenCalledTimes(1);
    expect(getX({ arg: 10 })).toEqual(10);
    expect(getY({ val: 10 })).toEqual(10);
  });

  it('dRotateLine', () => {
    const fluentLine = (line as any).mock.results[1].value;
    const getX = fluentLine.x.mock.calls[0][0];
    const getY = fluentLine.y.mock.calls[0][0];

    expect(fluentLine.x).toHaveBeenCalledTimes(1);
    expect(fluentLine.y).toHaveBeenCalledTimes(1);
    expect(getX({ val: 10 })).toEqual(10);
    expect(getY({ arg: 10 })).toEqual(10);
  });

  it('dSpline', () => {
    const fluentLine = (line as any).mock.results[2].value;
    const getX = fluentLine.x.mock.calls[0][0];
    const getY = fluentLine.y.mock.calls[0][0];

    expect(fluentLine.x).toHaveBeenCalledTimes(1);
    expect(fluentLine.y).toHaveBeenCalledTimes(1);
    expect(fluentLine.curve).toHaveBeenCalledTimes(1);
    expect(getX({ arg: 10 })).toEqual(10);
    expect(getY({ val: 10 })).toEqual(10);
    expect(fluentLine.curve).toHaveBeenCalledWith('#curve-monotone-x');
  });

  it('dRotateSpline', () => {
    const fluentLine = (line as any).mock.results[3].value;
    const getX = fluentLine.x.mock.calls[0][0];
    const getY = fluentLine.y.mock.calls[0][0];

    expect(fluentLine.x).toHaveBeenCalledTimes(1);
    expect(fluentLine.y).toHaveBeenCalledTimes(1);
    expect(fluentLine.curve).toHaveBeenCalledTimes(1);
    expect(getX({ val: 10 })).toEqual(10);
    expect(getY({ arg: 10 })).toEqual(10);
    expect(fluentLine.curve).toHaveBeenCalledWith('#curve-monotone-y');
  });
});

describe('#dBar', () => {
  it('should return bar coordinates', () => {
    expect(dBar(30, 2, 20, 10, false)).toEqual({ x: 25, y: 2, width: 10, height: 18 });
  });

  it('should return bar coordinates, rotated', () => {
    expect(dBar(30, 2, 20, 10, true)).toEqual({ x: 2, y: 25, width: 18, height: 10 });
  });

  it('should return bar coordinates, startVal < val', () => {
    expect(dBar(30, 20, 2, 10, false)).toEqual({ x: 25, y: 2, width: 10, height: 18 });
  });

  it('should return bar coordinates, width is 0', () => {
    expect(dBar(30, 20, 2, 0, false)).toEqual({ x: 30, y: 2, width: 2, height: 18 });
  });

  it('should return bar coordinates, width is 0, rotated', () => {
    expect(dBar(30, 20, 2, 0, true)).toEqual({ x: 2, y: 30, width: 18, height: 2 });
  });
});

describe('getAreaPointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(14);
    const valueScale = jest.fn().mockReturnValueOnce(4).mockReturnValueOnce(9);

    const transform = getAreaPointTransformer({ argumentScale, valueScale } as any);
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 } as any),
    ).toEqual({
      argument: 'arg',
      value: 'val',
      index: 1,
      arg: 14,
      val: 9,
      startVal: 4,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
  });

  it('should return target element', () => {
    expect(getAreaPointTransformer.getTargetElement({
      arg: 10, val: 20,
    } as any)).toEqual([9, 19, 11, 21]);
  });

  it('should return target element / rotated', () => {
    expect(getAreaPointTransformer.getTargetElement({
      arg: 10, val: 20, rotated: true,
    } as any)).toEqual([19, 9, 21, 11]);
  });
});

describe('getScatterPointTransformer', () => {
  afterEach(jest.clearAllMocks);

  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(14);
    const valueScale = jest.fn().mockReturnValue(4);

    const transform = getScatterPointTransformer({ argumentScale, valueScale } as any);
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 } as any),
    ).toEqual({
      argument: 'arg',
      value: 'val',
      index: 1,
      arg: 14,
      val: 4,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([['val']]);
  });

  it('should return target element', () => {
    expect(getScatterPointTransformer.getTargetElement({
      arg: 10, val: 20, point: { size: 4 },
    } as any)).toEqual([8, 18, 12, 22]);
  });

  it('should return target element / rotated', () => {
    expect(getScatterPointTransformer.getTargetElement({
      arg: 10, val: 20, point: { size: 4 }, rotated: true,
    } as any)).toEqual([18, 8, 22, 12]);
  });
});

describe('getLinePointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(14);
    const valueScale = jest.fn().mockReturnValueOnce(9);

    const transform = getLinePointTransformer({ argumentScale, valueScale } as any);
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 } as any),
    ).toEqual({
      argument: 'arg',
      value: 'val',
      index: 1,
      arg: 14,
      val: 9,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([['val']]);
  });
});

describe('getBarPointTransformer', () => {
  it('should return data', () => {
    const argumentScale = jest.fn().mockReturnValue(21) as any;
    argumentScale.bandwidth = () => 20;
    const valueScale = jest.fn();
    valueScale.mockReturnValueOnce(4);
    valueScale.mockReturnValueOnce(9);

    const transform = getBarPointTransformer({
      argumentScale, valueScale,
    } as any);
    expect(
      transform({ argument: 'arg', value: 'val', index: 1 } as any),
    ).toEqual({
      argument: 'arg',
      value: 'val',
      index: 1,
      arg: 21,
      val: 9,
      maxBarWidth: 20,
      startVal: 4,
    });
    expect(argumentScale.mock.calls).toEqual([['arg']]);
    expect(valueScale.mock.calls).toEqual([[0], ['val']]);
  });

  it('should be marked with *isBroad* flag', () => {
    expect(getBarPointTransformer.isBroad).toEqual(true);
  });

  it('should return target element', () => {
    expect(getBarPointTransformer.getTargetElement({
      arg: 30, val: 20, startVal: 30, barWidth: 0.4, maxBarWidth: 20,
    } as any)).toEqual([26, 20, 34, 30]);
  });

  it('should return target element / rotated', () => {
    expect(getBarPointTransformer.getTargetElement({
      arg: 30, val: 20, startVal: 30, barWidth: 0.4, maxBarWidth: 20, rotated: true,
    } as any)).toEqual([20, 26, 30, 34]);
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
    ]) as any;
    mockPie.sort = jest.fn().mockReturnValue(mockPie);
    mockPie.value = jest.fn().mockReturnValue(mockPie);
    (pie as jest.Mock).mockReturnValue(mockPie);

    const argumentScale = { range: () => [0, 50] };
    const valueScale = { range: () => [40, 0] };
    const transform = getPiePointTransformer({
      argumentScale,
      valueScale,
      points: 'test-points',
    } as any);

    expect(
      transform({
        argument: 'arg-1', value: 'val-1', index: 1, color: 'c1',
      } as any),
    ).toEqual({
      argument: 'arg-1',
      value: 'val-1',
      index: 1,
      arg: 25,
      val: 20,
      color: 'c1',
      maxRadius: 20,
      startAngle: 3,
      endAngle: 4,
    });
    expect(
      transform({
        argument: 'arg-2', value: 'val-2', index: 3, color: 'c2',
      } as any),
    ).toEqual({
      argument: 'arg-2',
      value: 'val-2',
      index: 3,
      arg: 25,
      val: 20,
      color: 'c2',
      maxRadius: 20,
      startAngle: 7,
      endAngle: 8,
    });

    expect(mockPie.sort).toBeCalledWith(null);
    expect(mockPie.value).toBeCalledWith(expect.any(Function));
    expect(mockPie).toBeCalledWith('test-points');
  });

  it('should return target element', () => {
    expect(getPiePointTransformer.getTargetElement({
      arg: 10, val: 20, innerRadius: 1, outerRadius: 2, maxRadius: 20, startAngle: 45, endAngle: 60,
    } as any)).toEqual([11.5, 22.5, 12.5, 23.5]);
    expect(mockArc.centroid).toBeCalledWith({
      startAngle: 45,
      endAngle: 60,
      innerRadius: 20,
      outerRadius: 40,
    });
  });

  it('should return point color', () => {
    expect(getPiePointTransformer.getPointColor(
      ['color1', 'color2'], 1,
    )).toEqual('color2');
  });
});

describe('findSeriesByName', () => {
  it('should return series by name', () => {
    const symbolName = Symbol('Series 2');
    const series = [
      { symbolName: Symbol('Series 1') },
      { symbolName },
      { symbolName: Symbol('Series 3') },
    ];

    expect(findSeriesByName(symbolName as any, series as any)).toEqual(series[1]);
    expect(findSeriesByName(Symbol('test') as any, series as any)).toEqual(undefined);
  });
});

describe('dSymbol', () => {
  afterEach(jest.clearAllMocks);

  it('should return d attribute for point and coordinates', () => {
    const result = dSymbol({ size: 3 });

    expect(result).toEqual('symbol path');
    expect((symbol as any).mock.results[0].value.size).toBeCalledWith(9);
    expect((symbol as any).mock.results[0].value.type).toBeCalledWith(symbolCircle);
  });
});

describe('dPie', () => {
  afterEach(jest.clearAllMocks);

  it('should return pie coordinates', () => {
    const result = dPie({
      maxRadius: 10, innerRadius: 4, outerRadius: 8, startAngle: 90, endAngle: 180,
    } as any);

    expect(mockArc).toBeCalledWith({
      innerRadius: 40,
      outerRadius: 80,
      startAngle: 90,
      endAngle: 180,
    });
    expect(result).toEqual('test-d');
  });
});

describe('addSeries', () => {
  const palette = ['c1', 'c2', 'c3'];

  it('should append element to list', () => {
    const result = addSeries(
      [{ name: 's1' }, { name: 's2' }] as any, [], palette, { name: 'test' },
    );
    expect(result).toEqual([
      { name: 's1' },
      { name: 's2' },
      {
        name: 'test',
        index: 2,
        points: [],
        color: 'c3',
      },
    ]);
  });

  it('should generate unique name prop', () => {
    const result = addSeries([{ name: 'test' }] as any, [], palette, { name: 'test' });
    expect(result).toEqual([
      { name: 'test' },
      expect.objectContaining({ name: 'test0' }),
    ]);
  });

  it('should attempt to generate unique name several times', () => {
    const result = addSeries(
      [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }] as any,
      [], palette, { name: 'test1' },
    );
    expect(result[3].name).toEqual('test4');
  });

  it('should take color from palette and favor own series color', () => {
    let result: any = [{ name: 's1' }, { name: 's2' }];
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
      getPointTransformer: {},
    };
    const data = [
      { arg: 'a', val: 1 },
      { arg: 'b', val: 2 },
      { val: 3 },
      { arg: 'd', val: 4 },
      { arg: 'e' },
    ];
    const result = addSeries(
      [{ name: 's1' }] as any,
      data,
      palette,
      props,
      { userOptions: 'userOptions' });
    expect(result).toEqual([
      { name: 's1' },
      {
        ...props,
        index: 1,
        name: 'test',
        points: [
          {
            argument: 'a', value: 1, index: 0, userOptions: 'userOptions', color: 'c2',
          },
          {
            argument: 'b', value: 2, index: 1, userOptions: 'userOptions', color: 'c2',
          },
          {
            argument: 'd', value: 4, index: 3, userOptions: 'userOptions', color: 'c2',
          },
        ],
        color: 'c2',
      },
    ]);
  });

  it('should calculate point color with `getPointColor` function', () => {
    const props = {
      name: 'test',
      argumentField: 'arg',
      valueField: 'val',
      getPointTransformer: { getPointColor: jest.fn().mockReturnValue('point color') },
    };
    const data = [
      { arg: 'a', val: 1 },
      { arg: 'b', val: 2 },
      { val: 3 },
      { arg: 'd', val: 4 },
      { arg: 'e' },
    ];
    const result = addSeries(
      [{ name: 's1' }] as any,
      data,
      palette,
      props,
      { userOptions: 'userOptions' });
    expect(result).toEqual([
      { name: 's1' },
      {
        ...props,
        index: 1,
        name: 'test',
        points: [
          {
            argument: 'a', value: 1, index: 0, userOptions: 'userOptions', color: 'point color',
          },
          {
            argument: 'b', value: 2, index: 1, userOptions: 'userOptions', color: 'point color',
          },
          {
            argument: 'd', value: 4, index: 3, userOptions: 'userOptions', color: 'point color',
          },
        ],
        color: 'c2',
      },
    ]);

    expect(props.getPointTransformer.getPointColor.mock.calls).toEqual([
      [palette, 0],
      [palette, 1],
      [palette, 3],
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
      scaleName: 'domain-1',
      getPointTransformer: getPointTransformer1,
      points: [{ name: 'a1' }, { name: 'a2' }],
    };
    const series2 = {
      getPointTransformer: getPointTransformer2,
      points: [{ name: 'b1' }, { name: 'b2' }, { name: 'b3' }],
    };

    const result = scaleSeriesPoints([series1, series2] as any, scales as any, 'test-rotated');

    expect(result[0].points).toEqual([
      { name: 'a1', tag: '#1', rotated: 'test-rotated' },
      { name: 'a2', tag: '#1', rotated: 'test-rotated' },
    ]);
    expect(result[1].points).toEqual([
      { name: 'b1', tag: '#2', rotated: 'test-rotated' },
      { name: 'b2', tag: '#2', rotated: 'test-rotated' },
      { name: 'b3', tag: '#2', rotated: 'test-rotated' },
    ]);
    expect(getPointTransformer1).toBeCalledWith({
      ...series1,
      argumentScale: 'test-arg-scale', valueScale: 'test-val-scale-1',
    });
    expect(getPointTransformer2).toBeCalledWith({
      ...series2,
      argumentScale: 'test-arg-scale', valueScale: 'test-val-scale',
    });
  });
});

describe('transformers', () => {
  it('should ensure that all transformes are difference instances', () => {
    const list = [
      getAreaPointTransformer,
      getLinePointTransformer,
      getBarPointTransformer,
      getScatterPointTransformer,
      getPiePointTransformer,
    ];
    expect(new Set(list).size).toEqual(list.length);
  });
});

describe('#getVisibility', () => {
  it('should return hidden, point is out of pane', () => {
    expect(getVisibility({ width: 30, height: 20 }, -3, 10, 1, 5)).toBe('hidden');
    expect(getVisibility({ width: 30, height: 20 }, 33, 10, 1, 5)).toBe('hidden');
    expect(getVisibility({ width: 30, height: 20 }, 10, -2, 5, 1)).toBe('hidden');
    expect(getVisibility({ width: 30, height: 20 }, 10, 22, 5, 1)).toBe('hidden');
  });

  it('should return visible, point in the pane', () => {
    expect(getVisibility({ width: 30, height: 20 }, -3, 10, 7, 5)).toBe('visible');
    expect(getVisibility({ width: 30, height: 20 }, 33, 10, 7, 5)).toBe('visible');
    expect(getVisibility({ width: 30, height: 20 }, 10, -2, 5, 7)).toBe('visible');
    expect(getVisibility({ width: 30, height: 20 }, 10, 22, 5, 7)).toBe('visible');
    expect(getVisibility({ width: 30, height: 20 }, 10, 10, 5, 7)).toBe('visible');
  });
});

describe('#adjustBarSize', () => {
  it('should adjust bar size', () => {
    expect(adjustBarSize({ x: -2, y: -3, width: 10, height: 20 }, { width: 30, height: 40 }))
    .toEqual({ x: 0, y: 0, width: 8, height: 17 });
    expect(adjustBarSize({ x: 2, y: 3, width: 30, height: 40 }, { width: 30, height: 40 }))
    .toEqual({ x: 2, y: 3, width: 28, height: 37 });
  });
});
