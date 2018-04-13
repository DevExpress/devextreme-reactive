import { getArgumentAxisName } from './computeds';

describe('Chart core', () => {
  describe('getArgumentAxisName', () => {
    it('should return horizontal axis', () => {
      const axisName = getArgumentAxisName([{ argumentField: 'argumentAxis' }]);
      expect(axisName).toBe('argumentAxis');
    });
  });
});
