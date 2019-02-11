import {
  getParameters,
  processHandleTooltip,
  createReference,
} from './computeds';
import {
  processPointerMove,
} from '../../utils/hover-state';

jest.mock('../../utils/hover-state', () => ({
  processPointerMove: jest.fn().mockReturnValue('test-target'),
}));

// @ts-ignore
window.pageXOffset = 120;
// @ts-ignore
window.pageYOffset = 110;

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
      'currentTarget' as any, 'mockFunction' as any)
    ).toBe('test-target');
    expect(processPointerMove).toBeCalledWith(
      [{ series: 'test-series', point: 'test-point' }],
      'currentTarget',
      'mockFunction'
    );
  });
});

describe('#createReference', () => {
  it('should return reference object', () => {
    const root = {
      getBoundingClientRect: () => ({ left: 10, top: 5 }),
    };

    const obj = createReference([41, 32, 45, 34], { current: root as any });

    expect(obj).toEqual({
      clientWidth: 0,
      clientHeight: 0,
      getBoundingClientRect: expect.any(Function),
    });
    expect(obj.getBoundingClientRect()).toEqual({
      left: 171,
      top: 147,
      right: 175,
      bottom: 149,
      width: 0,
      height: 0,
    });
  });
});
