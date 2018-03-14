import { getArgumentAxisName } from './computeds';

describe('Chart core', () => {
  it('getArgumentAxisName should return horizontal axis', () => {
    const argumentAxisName = getArgumentAxisName([
      { name: 'axis' },
      { orientation: 'horizontal', name: 'argumentAxis' },
    ]);
    expect(argumentAxisName).toBe('argumentAxis');
  });
});
