import {
  defaultDomains, addDomain, extendDomains, buildScales,
} from './computeds';
import {
  scaleLinear, scaleBand,
} from '../../utils/scale';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';

describe('Scale', () => {
  describe('defaultDomains', () => {
    it('should contain argument and value domains', () => {
      expect(defaultDomains).toEqual({
        [ARGUMENT_DOMAIN]: { domain: [], isDiscrete: false },
        [VALUE_DOMAIN]: { domain: [], isDiscrete: false },
      });
    });
  });

  describe('addDomain', () => {
    it('should add domain to map', () => {
      expect(addDomain(
        { 'domain-1': { tag: '1' }, 'domain-2': { tag: '2' } } as any,
        'test-domain', { tag: 'test' },
      )).toEqual({
        'domain-1': { tag: '1' },
        'domain-2': { tag: '2' },
        'test-domain': { domain: [], isDiscrete: false },
      });
    });

    it('should check "factory" and "modifyDomain" options', () => {
      const factory = () => ({});
      expect(addDomain(
        { 'domain-1': { tag: '1' }, 'domain-2': { tag: '2' } } as any,
        'test-domain', { factory, modifyDomain: 'test-modifier' },
      )).toEqual({
        'domain-1': { tag: '1' },
        'domain-2': { tag: '2' },
        'test-domain': { domain: [], factory, isDiscrete: false, modifyDomain: 'test-modifier' },
      });
    });

    it('should set "isDiscrete" state', () => {
      const factory = () => ({ bandwidth: 0 });
      expect(addDomain(
        { 'domain-1': { tag: '1' }, 'domain-2': { tag: '2' } } as any,
        'test-domain', { factory },
      )).toEqual({
        'domain-1': { tag: '1' },
        'domain-2': { tag: '2' },
        'test-domain': { domain: [], factory, isDiscrete: true },
      });
    });
  });

  describe('extendDomains', () => {
    const testDomains = {
      [ARGUMENT_DOMAIN]: { domain: [] },
      [VALUE_DOMAIN]: { domain: [] },
    };
    const getPointTransformer = () => null;

    it('should compute domains from series points', () => {
      const domains = extendDomains(testDomains as any, {
        getPointTransformer,
        points: [
          { argument: 1, value: 9 },
          { argument: 2, value: 2 },
          { argument: 3, value: 7 },
        ],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 3], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [2, 9], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should compute domains from series points, negative values', () => {
      const domains = extendDomains(testDomains as any, {
        getPointTransformer, points: [{ argument: 1, value: 9 }, { argument: 2, value: -10 }],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 2], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [-10, 9], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should compute domains from series points, zero values', () => {
      const domains = extendDomains(testDomains as any, {
        getPointTransformer, points: [{ argument: 1, value: 0 }, { argument: 2, value: 10 }],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 2], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [0, 10], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should include zero into bounds if series starts from zero', () => {
      const domains = extendDomains(testDomains as any, {
        getPointTransformer: { isStartedFromZero: true }, points: [{ argument: 1, value: 9 }],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 1], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [0, 9], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should compute domains from several series', () => {
      const makePoints = values => values.map((value, index) => ({ value, argument: index + 1 }));
      const series = [
        {
          getPointTransformer, points: makePoints([2, 3, 5, 6]),
        },
        {
          getPointTransformer, points: makePoints([-1, -3, 0, 1]), scaleName: 'domain1',
        },
        {
          getPointTransformer, points: makePoints([1, 2, 3, 1]), scaleName: 'domain1',
        },
        {
          getPointTransformer, points: makePoints([2, 5, 7, 3]),
        },
      ];
      const domains = series.reduce((acc, obj) => extendDomains(acc, obj), {
        ...testDomains, domain1: { domain: [] },
      });

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 4], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [2, 7], factory: scaleLinear, isDiscrete: false,
        },
        domain1: {
          domain: [-3, 3], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should compute banded domain', () => {
      const domains = extendDomains({
        ...testDomains,
        [ARGUMENT_DOMAIN]: { domain: [], factory: scaleBand, isDiscrete: true },
      } as any, {
        getPointTransformer,
        points: [
          { argument: 'a', value: 1 },
          { argument: 'b', value: 2 },
          { argument: 'c', value: 1.5 },
        ],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: ['a', 'b', 'c'], factory: scaleBand, isDiscrete: true,
        },
        [VALUE_DOMAIN]: {
          domain: [1, 2], factory: scaleLinear, isDiscrete: false,
        },
      });
    });

    it('should guess banded domain type by data', () => {
      const domains = extendDomains(testDomains as any, {
        getPointTransformer, points: [{ argument: 'a', value: 'A' }, { argument: 'b', value: 'B' }],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: ['a', 'b'], factory: scaleBand, isDiscrete: true,
        },
        [VALUE_DOMAIN]: {
          domain: ['A', 'B'], factory: scaleBand, isDiscrete: true,
        },
      });
    });

    it('should prefer custom factory over default one', () => {
      const factory1 = () => ({});
      const factory2 = () => ({ bandwidth: true });
      const series = [
        {
          getPointTransformer, points: [{ argument: 1, value: 11 }, { argument: 2, value: 12 }],
        },
        {
          getPointTransformer,
          scaleName: 'domain1',
          points: [{ argument: 3, value: 1 }, { argument: 4, value: 2 }, { argument: 5, value: 3 }],
        },
      ];
      const domains = series.reduce((acc, obj) => extendDomains(acc, obj), {
        ...testDomains,
        [ARGUMENT_DOMAIN]: { domain: [], factory: factory1, isDiscrete: false },
        domain1: { domain: [], factory: factory2, isDiscrete: true },
      });

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 5], factory: factory1, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [11, 12], factory: scaleLinear, isDiscrete: false,
        },
        domain1: {
          domain: [1, 2, 3], factory: factory2, isDiscrete: true,
        },
      });
    });

    it('should allow to customize domain', () => {
      const mock = jest.fn().mockReturnValue([10, 11]);
      const domains = extendDomains({
        ...testDomains,
        domain1: { domain: [], modifyDomain: mock },
      } as any, {
        getPointTransformer,
        scaleName: 'domain1',
        points: [{ argument: 1, value: 3 }, { argument: 2, value: 14 }],
      } as any);

      expect(domains).toEqual({
        [ARGUMENT_DOMAIN]: {
          domain: [1, 2], factory: scaleLinear, isDiscrete: false,
        },
        [VALUE_DOMAIN]: {
          domain: [],
        },
        domain1: {
          domain: [10, 11], modifyDomain: mock, factory: scaleLinear, isDiscrete: false,
        },
      });
      expect(mock).toBeCalledWith([3, 14]);
    });
  });

  describe('buildScales', () => {
    it('should build scales from domains', () => {
      const createMockScale = () => {
        const mock = jest.fn() as any;
        mock.domain = jest.fn().mockReturnValue(mock);
        mock.range = jest.fn().mockReturnValue(mock);
        return mock;
      };
      const mockScale1 = createMockScale();
      const mockScale2 = createMockScale();
      const mockScale3 = createMockScale();

      const scales = buildScales({
        [ARGUMENT_DOMAIN]: { domain: 'test-domain-1', factory: () => mockScale1 },
        [VALUE_DOMAIN]: { domain: 'test-domain-2', factory: () => mockScale2 },
        'test-domain': { domain: 'test-domain-3', factory: () => mockScale3 },
      }, {
        [ARGUMENT_DOMAIN]: [0, 400],
        [VALUE_DOMAIN]: [300, 0],
      });

      expect(scales).toEqual({
        [ARGUMENT_DOMAIN]: mockScale1,
        [VALUE_DOMAIN]: mockScale2,
        'test-domain': mockScale3,
      });
      expect(mockScale1.domain).toBeCalledWith('test-domain-1');
      expect(mockScale1.range).toBeCalledWith([0, 400]);
      expect(mockScale2.domain).toBeCalledWith('test-domain-2');
      expect(mockScale2.range).toBeCalledWith([300, 0]);
      expect(mockScale3.domain).toBeCalledWith('test-domain-3');
      expect(mockScale3.range).toBeCalledWith([300, 0]);
    });
  });
});
