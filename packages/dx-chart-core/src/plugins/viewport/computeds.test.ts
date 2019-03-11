import {
  ARGUMENT_DOMAIN, VALUE_DOMAIN,
} from '../../constants';
import {
  getValueDomainName, makeScale, scaleBounds,
} from '../../utils/scale';
import { adjustLayout } from './computeds';

jest.mock('../../utils/scale', () => ({
  getValueDomainName: jest.fn(),
  makeScale: jest.fn(),
  scaleBounds: jest.fn(),
}));

describe('Viewport', () => {
  const matchFloat = expected => ({
    $$typeof: Symbol.for('jest.asymmetricMatcher'),

    asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

    toAsymmetricMatcher: () => `~${expected}`,
  });

  describe('adjustLayout', () => {
    afterEach(jest.clearAllMocks);

    it('should return original ranges', () => {
      const ranges = { tag: 'test-ranges' };

      const result = adjustLayout('test-domains' as any, ranges as any, {});

      expect(result).toBe(ranges);
    });

    it('should change only argument range', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([20, 50]);

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: [0, 100],
        [VALUE_DOMAIN]: 'test-range',
      } as any, {
        argumentBounds: 'test-bounds',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: [matchFloat(-66.67), matchFloat(266.67)],
        [VALUE_DOMAIN]: 'test-range',
      });
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', 'test-bounds');
    });

    it('should change only value range', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([20, 50]);
      (getValueDomainName as jest.Mock).mockReturnValueOnce('domain-1');

      const result = adjustLayout({
        'domain-1': 'test-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: 'test-range',
        [VALUE_DOMAIN]: [0, 100],
      } as any, {
        scaleName: 'scale-1',
        valueBounds: 'test-bounds',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: 'test-range',
        [VALUE_DOMAIN]: [matchFloat(-66.67), matchFloat(266.67)],
      });
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', 'test-bounds');
      expect(getValueDomainName).toBeCalledWith('scale-1');
    });

    it('should change both ranges', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-arg-scale');
      (makeScale as jest.Mock).mockReturnValueOnce('test-val-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([250, 350]);
      (scaleBounds as jest.Mock).mockReturnValueOnce([70, 120]);
      (getValueDomainName as jest.Mock).mockReturnValueOnce('domain-1');

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-arg-domain',
        'domain-1': 'test-val-domain',
      } as any, {
        [ARGUMENT_DOMAIN]: [200, 400],
        [VALUE_DOMAIN]: [50, 150],
      } as any, {
        argumentBounds: 'test-arg-bounds',
        scaleName: 'scale-1',
        valueBounds: 'test-val-bounds',
      } as any);

      expect(result).toEqual({
        [ARGUMENT_DOMAIN]: [matchFloat(100), matchFloat(500)],
        [VALUE_DOMAIN]: [matchFloat(10), matchFloat(210)],
      });
      expect((makeScale as jest.Mock).mock.calls).toEqual([
        ['test-arg-domain', [200, 400]],
        ['test-val-domain', [50, 150]],
      ]);
      expect((scaleBounds as jest.Mock).mock.calls).toEqual([
        ['test-arg-scale', 'test-arg-bounds'],
        ['test-val-scale', 'test-val-bounds'],
      ]);
      expect(getValueDomainName).toBeCalledWith('scale-1');
    });

    it('should not change range if it is not actually changed', () => {
      (makeScale as jest.Mock).mockReturnValueOnce('test-scale');
      (scaleBounds as jest.Mock).mockReturnValueOnce([0, 100]);
      const ranges = {
        [ARGUMENT_DOMAIN]: [0, 100],
        [VALUE_DOMAIN]: 'test-range',
      };

      const result = adjustLayout({
        [ARGUMENT_DOMAIN]: 'test-domain',
      } as any, ranges as any, {
        argumentBounds: 'test-bounds',
      } as any);

      expect(result).toBe(ranges);
      expect(makeScale).toBeCalledWith('test-domain', [0, 100]);
      expect(scaleBounds).toBeCalledWith('test-scale', 'test-bounds');
    });
  });
});
