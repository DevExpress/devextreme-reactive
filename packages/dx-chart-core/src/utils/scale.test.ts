import {
  isHorizontal, getWidth, getValueDomainName, fixOffset, scaleLinear, scaleBand,
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
