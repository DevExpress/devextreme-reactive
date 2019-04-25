import {
  isHorizontal, getWidth, getValueDomainName, fixOffset,
  scaleLinear, scaleBand, makeScale, scaleBounds,
  moveBounds, growBounds, invertBoundsRange,
} from './scale';

jest.mock('d3-scale', () => ({
  scaleLinear: () => ({ tag: 'scale-linear' }),
  scaleBand: () => {
    const ret = { tag: 'scale-band' } as any;
    ret.paddingInner = (value) => {
      ret.inner = value;
      return ret;
    };
    ret.paddingOuter = (value) => {
      ret.outer = value;
      return ret;
    };
    ret.bandwidth = () => 0;
    return ret;
  },
}));

const realD3 = require.requireActual('d3-scale');

const matchFloat = (expected: number) => ({
  $$typeof: Symbol.for('jest.asymmetricMatcher'),

  asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

  toAsymmetricMatcher: () => `~${expected}`,
});

describe('#isHorizontal', () => {
  it('should consider argument scale horizontal', () => {
    expect(isHorizontal('argument-domain')).toEqual(true);
  });

  it('should consider value scale vertical', () => {
    expect(isHorizontal('value-scale')).toEqual(false);
    expect(isHorizontal('scale-1')).toEqual(false);
  });
});

describe('#getWidth', () => {
  it('should return offset 0, scale is not band', () => {
    expect(getWidth({} as any)).toBe(0);
  });

  it('should return offset not zero, scale is band', () => {
    expect(getWidth({ bandwidth: () => 4 } as any)).toBe(4);
  });
});

describe('#getValueDomainName', () => {
  it('should return argument', () => {
    expect(getValueDomainName('test-domain')).toEqual('test-domain');
  });

  it('should return default value', () => {
    expect(getValueDomainName()).toEqual('value-domain');
  });
});

describe('#fixOffset', () => {
  it('should return original linear scale', () => {
    const mock = () => 0;
    expect(fixOffset(mock as any)).toBe(mock);
  });

  it('should return wrapped band scale', () => {
    const mock = x => x * 2;
    mock.bandwidth = () => 4;
    const wrapped = fixOffset(mock as any);
    expect(wrapped).not.toBe(mock);
    expect(wrapped(0)).toEqual(2);
    expect(wrapped(3)).toEqual(8);
  });
});

describe('default scales', () => {
  it('should provide linear scale', () => {
    expect(scaleLinear()).toEqual({ tag: 'scale-linear' });
  });

  it('should provide band scale', () => {
    expect(scaleBand()).toEqual({
      tag: 'scale-band',
      inner: 0.3,
      outer: 0.15,
      paddingInner: expect.any(Function),
      paddingOuter: expect.any(Function),
      bandwidth: expect.any(Function),
    });
  });
});

describe('#makeScale', () => {
  it('should create scale', () => {
    const mock: { domain?: any, range?: any } = {};
    mock.domain = jest.fn().mockReturnValue(mock);
    mock.range = jest.fn().mockReturnValue(mock);
    const factory = jest.fn().mockReturnValue(mock);

    const scale = makeScale({ factory, domain: 'test-domain' } as any, [10, 20]);

    expect(scale).toBe(mock);
    expect(factory).toBeCalledWith();
    expect(mock.domain).toBeCalledWith('test-domain');
    expect(mock.range).toBeCalledWith([10, 20]);
  });
});

// Regarding commented "target2" cases for band scales - see note for "scaleBounds".

describe('#scaleBounds', () => {
  it('should measure continuous scale', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);

    expect(scaleBounds(target1, [3, 4])).toEqual([30, 40]);
    expect(scaleBounds(target2, [3, 4])).toEqual([70, 60]);
  });

  it('should measure discrete scale', () => {
    const target1 = realD3.scaleBand().paddingInner(0.1).paddingOuter(0.2)
      .domain(['a', 'b', 'c', 'd', 'e']).range([0, 100]);
    // const target2 = realD3.scaleBand().paddingInner(0.1).paddingOuter(0.2)
    //   .domain(['a', 'b', 'c', 'd', 'e']).range([100, 0]);

    expect(scaleBounds(target1, ['b', 'c'])).toEqual([20, 60]);
    // expect(scaleBounds(target2, ['b', 'c'])).toEqual([80, 40]);
  });
});

describe('#moveBounds', () => {
  it('should move bounds / linear', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);

    expect(moveBounds(target1, [3, 4], 10)).toEqual([4, 5]);
    expect(moveBounds(target2, [3, 4], -10)).toEqual([4, 5]);

    expect(moveBounds(target1, [3, 4], -20)).toEqual([1, 2]);
    expect(moveBounds(target2, [3, 4], 20)).toEqual([1, 2]);

    expect(moveBounds(target1, [7, 9], 20)).toEqual([8, 10]);
    expect(moveBounds(target2, [7, 9], -20)).toEqual([8, 10]);

    expect(moveBounds(target1, [1, 4], -20)).toEqual([0, 3]);
    expect(moveBounds(target2, [1, 4], 20)).toEqual([0, 3]);
  });

  it('should not move bounds / linear', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);
    let bounds: any;

    bounds = [3, 4];
    expect(moveBounds(target1, bounds, 0)).toBe(bounds);
    expect(moveBounds(target2, bounds, 0)).toBe(bounds);

    bounds = [8, 10];
    expect(moveBounds(target1, bounds, 10)).toBe(bounds);
    expect(moveBounds(target2, bounds, -10)).toBe(bounds);

    bounds = [0, 1];
    expect(moveBounds(target1, bounds, -10)).toBe(bounds);
    expect(moveBounds(target2, bounds, 10)).toBe(bounds);
  });

  it('should move bounds / band', () => {
    const target1 = realD3.scaleBand().padding(0.3)
      .domain(['a', 'b', 'c', 'd', 'e']).range([0, 100]);
    // const target2 = realD3.scaleBand().padding(0.3)
    //   .domain(['a', 'b', 'c', 'd', 'e']).range([100, 0]);

    expect(moveBounds(target1, ['b', 'c'], 8)).toEqual(['c', 'd']);
    // expect(moveBounds(target2, ['b', 'c'], -8)).toEqual(['c', 'd']);

    expect(moveBounds(target1, ['c', 'd'], -35)).toEqual(['a', 'b']);
    // expect(moveBounds(target2, ['c', 'd'], 35)).toEqual(['a', 'b']);

    expect(moveBounds(target1, ['c', 'd'], 50)).toEqual(['d', 'e']);
    // expect(moveBounds(target2, ['c', 'd'], -50)).toEqual(['d', 'e']);

    expect(moveBounds(target1, ['b', 'c'], -50)).toEqual(['a', 'b']);
    // expect(moveBounds(target2, ['b', 'c'], 50)).toEqual(['a', 'b']);
  });

  it('should not move bounds / band', () => {
    const target1 = realD3.scaleBand().padding(0.3)
      .domain(['a', 'b', 'c', 'd', 'e']).range([0, 100]);
    // const target2 = realD3.scaleBand().padding(0.3)
    //   .domain(['a', 'b', 'c', 'd', 'e']).range([100, 0]);
    let bounds: any;

    bounds = ['b', 'c'];
    expect(moveBounds(target1, bounds, 5)).toBe(bounds);
    // expect(moveBounds(target2, bounds, -5)).toBe(bounds);

    bounds = ['d', 'e'];
    expect(moveBounds(target1, bounds, 40)).toBe(bounds);
    // expect(moveBounds(target2, bounds, -40)).toBe(bounds);

    bounds = ['a', 'b'];
    expect(moveBounds(target1, bounds, -30)).toBe(bounds);
    // expect(moveBounds(target2, bounds, 30)).toBe(bounds);
  });
});

describe('#growBounds', () => {
  it('should grow bounds / linear', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);

    expect(growBounds(target1, [2, 6], 10, 40)).toEqual([3, 5]);
    expect(growBounds(target1, [2, 6], 10, 20)).toEqual([2, 4]);
    expect(growBounds(target1, [2, 6], 10, 60)).toEqual([4, 6]);
    expect(growBounds(target2, [2, 6], 10, 60)).toEqual([3, 5]);
    expect(growBounds(target2, [2, 6], 10, 80)).toEqual([2, 4]);
    expect(growBounds(target2, [2, 6], 10, 40)).toEqual([4, 6]);

    expect(growBounds(target1, [3, 5], -10, 40)).toEqual([2, 6]);
    expect(growBounds(target1, [3, 5], -10, 30)).toEqual([3, 7]);
    expect(growBounds(target1, [3, 5], -10, 50)).toEqual([1, 5]);
    expect(growBounds(target2, [3, 5], -10, 60)).toEqual([2, 6]);
    expect(growBounds(target2, [3, 5], -10, 70)).toEqual([3, 7]);
    expect(growBounds(target2, [3, 5], -10, 50)).toEqual([1, 5]);

    expect(growBounds(target1, [4, 5], 40, 45)).toEqual([4.45, 4.55].map(matchFloat));
    expect(growBounds(target2, [4, 5], 40, 55)).toEqual([4.45, 4.55].map(matchFloat));

    expect(growBounds(target1, [1,  9], -30, 50)).toEqual([0, 10]);
    expect(growBounds(target2, [1,  9], -30, 50)).toEqual([0, 10]);
  });

  it('should not grow bounds / linear', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);
    let bounds: any;

    bounds = [2, 6];
    expect(growBounds(target1, bounds, 0, 40)).toBe(bounds);
    expect(growBounds(target2, bounds, 0, 60)).toBe(bounds);

    bounds = [0, 10];
    expect(growBounds(target1, bounds, -10, 30)).toBe(bounds);
    expect(growBounds(target2, bounds, -10, 70)).toBe(bounds);

    bounds = [5.05, 5.15];
    expect(growBounds(target1, bounds, 10, 51)).toBe(bounds);
    expect(growBounds(target2, bounds, 10, 49)).toBe(bounds);
  });

  it('should grow bounds / band', () => {
    const target1 = realD3.scaleBand().padding(0.3)
      .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']).range([0, 100]);
    // const target2 = realD3.scaleBand().padding(0.3)
    //   .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']).range([100, 0]);

    expect(growBounds(target1, ['b', 'f'], 8, 45)).toEqual(['c', 'e']);
    expect(growBounds(target1, ['b', 'f'], 8, 15)).toEqual(['b', 'd']);
    expect(growBounds(target1, ['b', 'f'], 8, 55)).toEqual(['d', 'f']);
    // target2

    expect(growBounds(target1, ['c', 'e'], -20, 35)).toEqual(['b', 'f']);
    expect(growBounds(target1, ['c', 'e'], -20, 25)).toEqual(['c', 'g']);
    expect(growBounds(target1, ['c', 'e'], -20, 45)).toEqual(['a', 'e']);
    // target2

    expect(growBounds(target1, ['f', 'g'], 30, 65)).toEqual(['f', 'f']);
    expect(growBounds(target1, ['f', 'g'], 30, 75)).toEqual(['g', 'g']);
    // target2

    expect(growBounds(target1, ['b', 'i'], -40, 50)).toEqual(['a', 'j']);
    // target2
  });

  it('should not grow bounds / band', () => {
    const target1 = realD3.scaleBand().padding(0.3)
      .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']).range([0, 100]);
    // const target2 = realD3.scaleBand().padding(0.3)
    //   .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']).range([100, 0]);
    let bounds: any;

    bounds = ['d', 'g'];
    expect(growBounds(target1, bounds, 0, 50)).toBe(bounds);
    // target2

    bounds = ['e', 'e'];
    expect(growBounds(target1, bounds, 10, 50)).toBe(bounds);
    // target2

    bounds = ['a', 'j'];
    expect(growBounds(target1, bounds, -10, 50)).toBe(bounds);
    // target2
  });
});

describe('#invertBoundsRange', () => {
  it('should invert range / linear', () => {
    const target1 = realD3.scaleLinear().domain([0, 10]).range([0, 100]);
    const target2 = realD3.scaleLinear().domain([0, 10]).range([100, 0]);

    expect(invertBoundsRange(target1, [30, 50])).toEqual([3, 5]);
    expect(invertBoundsRange(target2, [30, 50])).toEqual([5, 7]);
  });

  it('should invert range / band', () => {
    const target1 = realD3.scaleBand().padding(0.3)
      .domain(['a', 'b', 'c', 'd', 'e']).range([0, 100]);
    // const target2 = realD3.scaleBand().padding(0.3)
    //   .domain(['a', 'b', 'c', 'd', 'e']).range([100, 0]);

    expect(invertBoundsRange(target1, [25, 55])).toEqual(['b', 'c']);
    // target2
  });
});
