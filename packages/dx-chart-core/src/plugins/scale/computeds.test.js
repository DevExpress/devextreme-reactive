import { scaleLinear, scaleBand } from 'd3-scale';
import { computeDomains, computeExtension, buildScales } from './computeds';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.fn(),
  scaleBand: jest.fn(),
}));

describe('computeDomains', () => {
  const getPointTransformer = () => null;

  it('should always create argument domain', () => {
    const domains = computeDomains([], []);

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [], orientation: 'horizontal',
      },
    });
  });

  it('should create default value domain', () => {
    const domains = computeDomains(
      [],
      [{ name: 'series1', getPointTransformer, points: [{ argument: 1, value: 1 }] }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 1], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from series points', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1',
        getPointTransformer,
        points: [
          { argument: 1, value: 9 },
          { argument: 2, value: 2 },
          { argument: 3, value: 7 },
        ],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 3], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [2, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from series points (temporary workaround for Stack)', () => {
    const getValueDomain = jest.fn().mockReturnValue([11, 15, 19, 23]);
    const points = [
      { argument: 1, value: 9 },
      { argument: 2, value: 2 },
      { argument: 3, value: 7 },
    ];
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer, getValueDomain, points,
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 3], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [11, 23], orientation: 'vertical', type: 'linear',
      },
    });
    expect(getValueDomain).toBeCalledWith(points);
  });

  it('should compute domains from series points, negative values', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer, points: [{ argument: 1, value: 9 }, { argument: 2, value: -10 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [-10, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from series points, zero values', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer, points: [{ argument: 1, value: 0 }, { argument: 2, value: 10 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [0, 10], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should include zero into bounds if series starts from zero', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer: { isStartedFromZero: true }, points: [{ argument: 1, value: 9 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [0, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from several series', () => {
    const makePoints = values => values.map((value, index) => ({ argument: index + 1, value }));
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer, points: makePoints([2, 3, 5, 6]),
      }, {
        name: 'series2', getPointTransformer, points: makePoints([-1, -3, 0, 1]), scaleName: 'domain1',
      }, {
        name: 'series3', getPointTransformer, points: makePoints([1, 2, 3, 1]), scaleName: 'domain1',
      }, {
        name: 'series4', getPointTransformer, points: makePoints([2, 5, 7, 3]),
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 4], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [2, 7], orientation: 'vertical', type: 'linear',
      },
      domain1: {
        domain: [-3, 3], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute banded domain', () => {
    const domains = computeDomains(
      [{ scaleName: ARGUMENT_DOMAIN, type: 'band' }],
      [{
        name: 'series1',
        getPointTransformer,
        points: [
          { argument: 'a', value: 1 },
          { argument: 'b', value: 2 },
          { argument: 'c', value: 1.5 },
        ],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['a', 'b', 'c'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 2], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should guess banded domain type by data', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', getPointTransformer, points: [{ argument: 'a', value: 'A' }, { argument: 'b', value: 'B' }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['a', 'b'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: ['A', 'B'], orientation: 'vertical', type: 'band',
      },
    });
  });

  it('should take min/max from axis', () => {
    const domains = computeDomains(
      [{ scaleName: 'domain1', min: 0, max: 10 }],
      [{
        name: 'series1',
        scaleName: 'domain1',
        getPointTransformer,
        points: [{ argument: 1, value: 3 }, { argument: 2, value: 14 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [0, 10], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should take one of min/max from axis', () => {
    const domains = computeDomains(
      [{ scaleName: 'domain1', max: 7 }],
      [{
        name: 'series1',
        scaleName: 'domain1',
        getPointTransformer,
        points: [{ argument: 1, value: 3 }, { argument: 2, value: 14 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [3, 7], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should ignore min/max for band domain', () => {
    const domains = computeDomains(
      [{
        scaleName: ARGUMENT_DOMAIN, min: 1, max: 7, type: 'band',
      }],
      [{
        name: 'series1',
        getPointTransformer,
        points: [{ argument: 'one', value: 9 }, { argument: 'two', value: 1 }, { argument: 'three', value: 1 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['one', 'two', 'three'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should ignore axes for unknown domains', () => {
    const domains = computeDomains(
      [
        { scaleName: 'domain1' },
        { scaleName: 'domain2' },
      ],
      [{
        name: 'series1', getPointTransformer, scaleName: 'domain1', points: [{ argument: 1, value: 9 }],
      }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [9, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });
});

describe('computeExtension', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default extension', () => {
    expect(computeExtension([]))
      .toEqual([
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: expect.any(Function) },
      ]);
  });

  it('should return mix of user and default extension', () => {
    expect(computeExtension([{ type: 'extraType', constructor: 'extraConstructor' }, { type: 'band', constructor: 'bandConstructor' }]))
      .toEqual([
        { type: 'extraType', constructor: 'extraConstructor' },
        { type: 'band', constructor: 'bandConstructor' },
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: expect.any(Function) },
      ]);
  });

  it('should apply paddings to band scale', () => {
    const mockBandScale = jest.fn();
    mockBandScale.paddingInner = jest.fn().mockReturnValue(mockBandScale);
    mockBandScale.paddingOuter = jest.fn().mockReturnValue(mockBandScale);
    scaleBand.mockReturnValue(mockBandScale);

    const scale = computeExtension([])[1].constructor();

    expect(scale).toEqual(mockBandScale);
    expect(scale.paddingInner).toBeCalledWith(0.3);
    expect(scale.paddingOuter).toBeCalledWith(0.15);
  });
});

describe('buildScales', () => {
  it('should build scales from domains', () => {
    const mockConstructor = jest.fn();
    const createMockScale = () => {
      const mock = jest.fn();
      mock.domain = jest.fn().mockReturnValue(mock);
      mock.range = jest.fn().mockReturnValue(mock);
      return mock;
    };
    const mockScale1 = createMockScale();
    const mockScale2 = createMockScale();
    const mockScale3 = createMockScale();
    mockConstructor.mockReturnValueOnce(mockScale1);
    mockConstructor.mockReturnValueOnce(mockScale2);
    mockConstructor.mockReturnValueOnce(mockScale3);

    const scales = buildScales({
      name1: { domain: 'test-domain-1', orientation: 'horizontal', type: 'test-type-1' },
      name2: { domain: 'test-domain-2', orientation: 'vertical', type: 'test-type-2' },
      name3: { domain: 'test-domain-3', orientation: 'horizontal', type: 'test-type-3' },
    }, [
      { type: 'test-type-1', constructor: mockConstructor },
      { type: 'test-type-2', constructor: mockConstructor },
      { type: 'test-type-3', constructor: mockConstructor },
    ], { width: 400, height: 300 });

    expect(scales).toEqual({
      name1: mockScale1,
      name2: mockScale2,
      name3: mockScale3,
    });
    expect(mockScale1.domain).toBeCalledWith('test-domain-1');
    expect(mockScale1.range).toBeCalledWith([0, 400]);
    expect(mockScale2.domain).toBeCalledWith('test-domain-2');
    expect(mockScale2.range).toBeCalledWith([300, 0]);
    expect(mockScale3.domain).toBeCalledWith('test-domain-3');
    expect(mockScale3.range).toBeCalledWith([0, 400]);
  });
});
