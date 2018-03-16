import { domains } from './computeds';

describe('calculateDomain', () => {
  it('should be equal axes min max option', () => {
    const axes = [{
      name: 'axis', min: 0, max: 10, orientation: 'horizontal',
    }];
    const series = [];
    const data = [];
    const calculatedDomains = domains(axes, series, data, 'axis');
    expect(calculatedDomains).toEqual({ axis: { domain: [0, 10], orientation: 'horizontal' } });
  });

  it('should be computed from data and series option', () => {
    const axes = [{ name: 'axis', orientation: 'horizontal' }];
    const series = [{ axisName: 'axis', argumentField: 'arg', valueField: 'val' }];
    const data = [{ arg: 1, val: 9 }];
    const calculatedDomains = domains(axes, series, data, 'axis');
    expect(calculatedDomains).toEqual({ axis: { domain: [1, 9], orientation: 'horizontal' } });
  });
});
