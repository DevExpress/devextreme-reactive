import { argumentAxisName } from './computeds';

describe('Chart core', () => {
  it('getArgumentAxisName should return horizontal axis', () => {
    const axisName = argumentAxisName([
      { name: 'axis' },
      { orientation: 'horizontal', name: 'argumentAxis' },
    ]);
    expect(axisName).toBe('argumentAxis');
  });
});
