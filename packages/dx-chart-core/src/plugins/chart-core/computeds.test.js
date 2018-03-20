import { argumentAxisName } from './computeds';

describe('Chart core', () => {
  describe('getArgumentAxisName', () => {
    it('should return horizontal axis', () => {
      const axisName = argumentAxisName([
        { name: 'axis' },
        { orientation: 'horizontal', name: 'argumentAxis' },
      ]);
      expect(axisName).toBe('argumentAxis');
    });
  });
});
