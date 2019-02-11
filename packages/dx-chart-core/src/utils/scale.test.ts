import {
  isHorizontal, getWidth, getValueDomainName, fixOffset,
} from './scale';

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
