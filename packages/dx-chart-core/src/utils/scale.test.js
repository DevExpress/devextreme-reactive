import { scaleLinear, scaleBand } from 'd3-scale';
import { createScale } from './scale';

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

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(),
  scaleBand: jest.fn(),
}));

describe('Create scale', () => {
  beforeAll(() => {
    scaleLinear.mockImplementation(() => linearMockScale);
    scaleBand.mockImplementation(() => bandMockScale);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created from d3 scale linear', () => {
    const scale = createScale(domainOptions, width, height);
    expect(scale).toBe(linearMockScale);
  });

  it('should set domain from option', () => {
    createScale(domainOptions, width, height);
    expect(linearMockScale.domain).toBeCalledWith([0, 100]);
  });

  it('should set range from width option. Horizontal', () => {
    createScale(domainOptions, width, height);
    expect(linearMockScale.range).toBeCalledWith([0, 500]);
  });

  it('should set range from height option. Vertical', () => {
    createScale({ ...domainOptions, orientation: 'vertical' }, width, height);
    expect(linearMockScale.range).toBeCalledWith([400, 0]);
  });

  it('should be create from d3 scale band', () => {
    const scale = createScale({ ...domainOptions, type: 'band' }, width, height);
    expect(scale).toBe(bandMockScale);
    expect(bandMockScale.paddingInner).toBeCalledWith(0);
  });

  it('should be set paddings to d3 scale band', () => {
    createScale({ ...domainOptions, type: 'band' }, width, height, 0.3);
    expect(bandMockScale.paddingInner).toBeCalledWith(0.3);
    expect(bandMockScale.paddingOuter).toBeCalledWith(0.3 / 2);
  });
});
