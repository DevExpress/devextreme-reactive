
import {
  symbol,
  symbolCircle,
  curveCatmullRom,
  arc,
  area,
  line,
} from 'd3-shape';
import { createScale } from '../../utils/scale';
import {
  pieAttributes,
  xyScales,
  pointAttributes,
  coordinates,
  findSeriesByName,
  seriesData,
  checkZeroStart,
  barCoordinates,
} from './computeds';

jest.mock('../../utils/scale', () => ({
  createScale: jest.fn(),
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

  const mockPie = {
    value: jest.fn(func => data => data.map(d => ({
      startAngle: func(d), endAngle: func(d), value: 'value', data: d,
    }))),
  };

  return {
    area: createMockWithFluentInterface(),
    line: createMockWithFluentInterface(),
    symbol: createMockWithFluentInterface(),
    pie: jest.fn().mockReturnValue(mockPie),
    arc: createMockWithFluentInterface(),
  };
});


const data = [
  {
    arg: 1, val1: 3, 'val1-Series3-stack': [2, 3],
  },
  {
    arg: 2, val1: 5, 'val1-Series3-stack': [4, 5],
  },
  {
    arg: 3, val1: 7, 'val1-Series3-stack': [6, 7],
  },
  {
    arg: 4, val1: 10, 'val1-Series3-stack': [9, 10],
  },
  {
    arg: 5, val1: 15, 'val1-Series3-stack': [14, 15],
  },
];

const dataWithUndefined = [
  {
    arg: 1, val1: 3, 'val1-Series3-stack': [3, 3],
  },
  {
    arg: undefined, val1: 5, 'val1-Series3-stack': [5, 5],
  },
  {
    arg: 3, val1: 7, 'val1-Series3-stack': [7, 7],
  },
  { arg: 4, val1: undefined },
  {
    arg: 5, val1: 15, 'val1-Series3-stack': [15, 15],
  },
];

const computedLine = data.map((item, index) => ({
  id: index, x: item.arg, y: item['val1-Series3-stack'][1], y1: item['val1-Series3-stack'][0], value: item.val1, width: 0,
}));

const groupWidth = 0.7;

describe('dArea', () => {
  it('init function', () => {
    expect(area).toHaveBeenCalledTimes(1);
  });

  it('x getter', () => {
    const fluentArea = area.mock.results[0].value;
    const getX = fluentArea.x.mock.calls[0][0];

    expect(fluentArea.x).toHaveBeenCalledTimes(1);
    expect(getX({ x: 10, width: 20 })).toEqual(20);
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

      expect(getX({ x: 10, width: 20 })).toEqual(20);
    });

    it('y1 getter', () => {
      const getY = line.mock.results[0].value.y.mock.calls[0][0];

      expect(getY({ y: 10 })).toEqual(10);
    });
  });

  describe('dSpline', () => {
    it('x getter', () => {
      const getX = line.mock.results[0].value.x.mock.calls[1][0];

      expect(getX({ x: 10, width: 20 })).toEqual(20);
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

describe('barCoordinates', () => {
  beforeAll(() => {
    const translateValue = value => value;
    translateValue.bandwidth = jest.fn().mockReturnValue(10);
    createScale.mockImplementation(() => translateValue);
  });

  afterAll(() => {
    createScale.mockRestore();
  });

  it('should return array object with x, width properties', () => {
    const result = barCoordinates(
      data,
      { xScale: createScale(), yScale: createScale() },
      'arg',
      'val1',
      'Series3',
      null,
      null,
      {},
    );

    expect(result).toEqual([{
      id: 0, value: 3, width: 10, x: 1, y: 3, y1: 2,
    }, {
      id: 1, value: 5, width: 10, x: 2, y: 5, y1: 4,
    }, {
      id: 2, value: 7, width: 10, x: 3, y: 7, y1: 6,
    }, {
      id: 3, value: 10, width: 10, x: 4, y: 10, y1: 9,
    }, {
      id: 4, value: 15, width: 10, x: 5, y: 15, y1: 14,
    }]);
  });
});

describe('Scales', () => {
  const defaultOptions = [
    { type: 'axisType', orientation: 'orientation' },
    { axisName: 'axisName' },
    { width: 20, height: 10 },
    0.7,
  ];

  beforeAll(() => {
    const translateValue = value => value;
    createScale.mockImplementation(() => translateValue);
  });

  it('should create scales with proper parameters', () => {
    const { xScale, yScale } = xyScales(...defaultOptions);

    expect(createScale).toHaveBeenCalledTimes(2);
    expect(createScale.mock.calls[0]).toEqual([{ type: 'axisType', orientation: 'orientation' }, 20, 10, 1 - groupWidth]);
    expect(createScale.mock.calls[1]).toEqual([{ axisName: 'axisName' }, 20, 10]);
    expect(xScale).toBeTruthy();
    expect(yScale).toBeTruthy();
  });
});

describe('Series attributes', () => {
  it('should return series by name', () => {
    const seriesSymbol = Symbol('Series2');
    const series = [{ symbolName: Symbol('Series2') }, { symbolName: seriesSymbol }, { symbolName: Symbol('Series3') }];
    expect(findSeriesByName(seriesSymbol, series)).toEqual(series[1]);
  });

  it('should return d attribute for point and coordinates', () => {
    const { d, x, y } = pointAttributes({ xScale: {} }, {})({ x: 1, y: 2 });
    expect(d).toBe('symbol path');
    expect(symbol.mock.results[0].value.size).toBeCalledWith([49]);
    expect(symbol.mock.results[0].value.type).toBeCalledWith(symbolCircle);
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  it('should return coordinates for path', () => {
    expect(coordinates(
      data,
      { xScale: createScale(), yScale: createScale() },
      'arg',
      'val1',
      'Series3',
    )).toEqual(computedLine);
  });

  it('should return coordinates for path, some value and argument fields are undefined', () => {
    expect(coordinates(
      dataWithUndefined,
      { xScale: createScale(), yScale: createScale() },
      'arg',
      'val1',
      'Series3',
    )).toEqual([
      {
        id: 0, x: 1, y: 3, y1: 3, value: 3, width: 0,
      },
      {
        id: 2, x: 3, y: 7, y1: 7, value: 7, width: 0,
      },
      {
        id: 4, x: 5, y: 15, y1: 15, value: 15, width: 0,
      },
    ]);
  });
});

describe('Pie attributes', () => {
  it('should return array of arcs', () => {
    const getScale = () => ({ range: jest.fn().mockReturnValue([10]) });
    const pieAttr = pieAttributes(data, { xScale: getScale(), yScale: getScale() }, 'arg', 'val1', null, null, null, { innerRadius: 0.3, outerRadius: 0.5 });

    expect(pieAttr).toHaveLength(data.length);
    pieAttr.forEach((attr, index) => {
      expect(attr.d).toBeTruthy();
      expect(attr.value).toBe('value');
      expect(attr.data).toEqual(data[index]);
      expect(attr.id).toEqual(data[index].arg);
      expect(attr.x).toEqual(5);
      expect(attr.y).toEqual(5);
    });
    data.forEach((d) => {
      expect(arc.mock.results[0].value.innerRadius).toHaveBeenCalledWith(1.5);
      expect(arc.mock.results[0].value.outerRadius).toHaveBeenCalledWith(2.5);
      expect(arc.mock.results[0].value.startAngle).toHaveBeenCalledWith(d.val1);
      expect(arc.mock.results[0].value.endAngle).toHaveBeenCalledWith(d.val1);
    });
  });
});

describe('seriesData', () => {
  it('should return array with props', () => {
    const seriesArray = seriesData(undefined, { first: true });
    expect(seriesArray).toEqual([{ first: true }]);
  });

  it('should push new series props', () => {
    const seriesArray = seriesData([{ uniqueName: 'defaultName' }], { uniqueName: 'defaultName' });
    expect(seriesArray).toEqual([{ uniqueName: 'defaultName' }, { uniqueName: 'defaultName0' }]);
  });

  it('should push new  props', () => {
    const seriesArray = seriesData([{ uniqueName: 'defaultName0' }], { uniqueName: 'defaultName0' });
    expect(seriesArray).toEqual([{ uniqueName: 'defaultName0' }, { uniqueName: 'defaultName1' }]);
  });
});

describe('checkZeroStart', () => {
  it('should return true for axis with bar', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'bar');
    expect(fromZero).toEqual({ axis1: true });
  });

  it('should return true for axis with area', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'area');
    expect(fromZero).toEqual({ axis1: true });
  });

  it('should return false for axis with another series type', () => {
    const fromZero = checkZeroStart({}, 'axis1', 'line');
    expect(fromZero).toEqual({ axis1: false });
  });
});
