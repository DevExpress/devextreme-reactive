import { createScale, getWidth } from './scale';

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

const scaleLinear = jest.fn();
const scaleBand = jest.fn();
describe('Create scale', () => {
  beforeAll(() => {
    scaleLinear.mockImplementation(() => linearMockScale);
    scaleBand.mockImplementation(() => bandMockScale);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create scale', () => {
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

  it('should be set paddings to scale if it is "band"', () => {
    createScale(domainOptions, width, height, scaleBand, 0.3);
    expect(bandMockScale.paddingInner).toBeCalledWith(0.3);
    expect(bandMockScale.paddingOuter).toBeCalledWith(0.3 / 2);
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
