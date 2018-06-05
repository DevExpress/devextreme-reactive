import { axisName } from './computeds';

describe('Axis name', () => {
  it('should return axis name, have to be passed', () => {
    expect(axisName('axisName')).toBe('axisName');
  });

  it('should return default axis name', () => {
    expect(axisName()).toBe('argumentAxis');
  });
});
