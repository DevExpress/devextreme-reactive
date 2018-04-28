import { argumentAxisName } from './computeds';

describe('Chart core', () => {
  describe('argumentAxisName', () => {
    it('should return horizontal axis', () => {
      const axisName = argumentAxisName([{ argumentField: 'argumentAxis' }]);
      expect(axisName).toBe('argumentAxis');
    });
  });
});
