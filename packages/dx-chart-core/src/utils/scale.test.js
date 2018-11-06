import { createScale, getWidth, getValueDomainName } from './scale';

const domainOptions = { domain: [0, 100], type: 'linear', orientation: 'horizontal' };
const width = 500;
const height = 400;

const linearMockScale = jest.fn().mockReturnValue(10);
linearMockScale.range = jest.fn().mockReturnThis();
linearMockScale.domain = jest.fn().mockReturnThis();

const bandMockScale = jest.fn().mockReturnValue(10);
bandMockScale.paddingInner = jest.fn().mockReturnThis();
bandMockScale.paddingOuter = jest.fn().mockReturnThis();
bandMockScale.range = jest.fn().mockReturnThis();
bandMockScale.domain = jest.fn().mockReturnThis();

const scaleLinear = jest.fn(() => linearMockScale);
const scaleBand = jest.fn(() => bandMockScale);

describe('Create scale', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create linear scale', () => {
    const scale = createScale(domainOptions, width, height, scaleLinear);
    expect(scale).toBe(linearMockScale);
  });

  it('should set domain from option', () => {
    createScale(domainOptions, width, height, scaleLinear);
    expect(linearMockScale.domain).toBeCalledWith([0, 100]);
  });

  it('should set range from width option. Horizontal', () => {
    createScale(domainOptions, width, height, scaleLinear);
    expect(linearMockScale.range).toBeCalledWith([0, 500]);
  });

  it('should set range from height option. Vertical', () => {
    createScale({ ...domainOptions, orientation: 'vertical' }, width, height, scaleLinear);
    expect(linearMockScale.range).toBeCalledWith([400, 0]);
  });

  it('should create band scale', () => {
    const scale = createScale(domainOptions, width, height, scaleBand, 0.3);
    expect(scale).toBe(bandMockScale);
  });
});

describe('Get offset', () => {
  it('should return offset 0, scale is not band', () => {
    expect(getWidth({})).toBe(0);
  });

  it('should return offset not zero, scale is band', () => {
    expect(getWidth({ bandwidth: () => 4 })).toBe(4);
  });
});

describe('getValueDomainName', () => {
  it('should return argument', () => {
    expect(getValueDomainName('test-domain')).toEqual('test-domain');
  });

  it('should return default value', () => {
    expect(getValueDomainName()).toEqual('value-domain');
  });
});
