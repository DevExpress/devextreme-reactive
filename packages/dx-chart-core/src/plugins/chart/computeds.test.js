import { getAxisName } from './computeds';

describe('Axis name', () => {
  it('should return axis name, have to be passed', () => {
    expect(getAxisName('axisName')).toBe('axisName');
  });

  it('should return default axis name', () => {
    expect(getAxisName()).toBe('argumentAxis');
  });
});
