import { calculateDomain } from './computeds';

describe('calculateDomain', () => {
  it('should be equal axes min max option', () => {
    const axes = [{ name: 'axis', min: 0, max: 10 }];
    const series = [];
    const data = [];
    const domains = calculateDomain(axes, series, data, 'axis');
    expect(domains).toEqual({ axis: [0, 10] });
  });

  it('should be computed from data and series option', () => {
    const axes = [];
    const series = [{ axisName: 'axis', argumentField: 'arg', valueField: 'val' }];
    const data = [{ arg: 1, val: 9 }];
    const domains = calculateDomain(axes, series, data, 'axis');
    expect(domains).toEqual({ axis: [1, 9] });
  });
});
