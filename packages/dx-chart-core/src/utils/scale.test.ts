import {
  isHorizontal, getWidth, getValueDomainName, fixOffset,
  scaleLinear, scaleBand, makeScale, scaleBounds,
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

describe('#scaleBounds', () => {
  it('should measure continuous scale', () => {
    const scale = jest.fn();
    scale.mockReturnValueOnce(30);
    scale.mockReturnValueOnce(40);

    const range = scaleBounds(scale as any, [40, 30]);

    expect(range).toEqual([30, 40]);
    expect(scale.mock.calls).toEqual([
      [40, 0, expect.anything()],
      [30, 1, expect.anything()],
    ]);
  });

  it('should measure discrete scale', () => {
    const scale = jest.fn() as any;
    scale.copy = jest.fn().mockReturnThis();
    scale.paddingInner = jest.fn().mockReturnThis();
    scale.paddingOuter = jest.fn().mockReturnThis();
    scale.mockReturnValueOnce(30);
    scale.mockReturnValueOnce(40);
    scale.bandwidth = () => 5;

    const range = scaleBounds(scale, ['A', 'B']);

    expect(range).toEqual([30, 45]);
    expect(scale.mock.calls).toEqual([
      ['A'],
      ['B'],
    ]);
    expect(scale.copy).toBeCalledWith();
    expect(scale.paddingInner).toBeCalledWith(0);
    expect(scale.paddingOuter).toBeCalledWith(0);
  });
});
