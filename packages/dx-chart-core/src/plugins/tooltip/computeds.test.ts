import {
  getParameters,
  processHandleTooltip,
} from './computeds';
import {
  processPointerMove,
} from '../../utils/hover-state';

jest.mock('../../utils/hover-state', () => ({
  processPointerMove: jest.fn().mockReturnValue('test-target'),
}));

describe('#getParameters', () => {
  const createSeries = name => ({
    name,
    points: [{ index: 0, value: 10 }, { index: 1, value: 20 }, { index: 2, value: 30 }],
    getPointTransformer: { getTargetElement: jest.fn(() => 'parameters') },
  });
  const series = [createSeries('s1'), createSeries('s2'), createSeries('s3')];

  it('should return text and element', () => {
    expect(getParameters(series as any, { series: 's2', point: 1 }))
    .toEqual({ element: 'parameters', text: '20' });
  });
});

describe('#processHandleTooltip', () => {
  afterEach(jest.clearAllMocks);

  it('should return target', () => {
    expect(processHandleTooltip(
      [{ series: 'test-series' }, { series: 'test-series', point: 'test-point' }] as any,
      'currentTarget' as any, 'mockFunction' as any))
      .toBe('test-target');
    expect(processPointerMove)
    .toBeCalledWith(
      [{ series: 'test-series', point: 'test-point' }],
      'currentTarget',
      'mockFunction');
  });
});
