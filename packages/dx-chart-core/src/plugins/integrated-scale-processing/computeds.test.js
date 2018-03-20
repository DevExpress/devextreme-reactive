import { domains } from './computeds';

describe('calculateDomain', () => {
  const argumentAxis = { name: 'argumentAxis', orientation: 'horizontal' };
  const valueAxis = { name: 'valueAxis', orientation: 'vertical' };

  it('should be equal axes min max option', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, min: 0, max: 10 }],
      [],
      [],
      'argumentAxis',
    );
    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [0, 10], orientation: 'horizontal' },
    });
  });


  it('should be computed from data and series option', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{ axisName: 'valueAxis', argumentField: 'arg', valueField: 'val' }],
      [{ arg: 1, val: 9 }],
      'argumentAxis',
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 1], orientation: 'horizontal' },
      valueAxis: { domain: [9, 9], orientation: 'vertical' },
    });
  });

  it('should be computed from data and series option with band type option', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, type: 'band' }, valueAxis],
      [{ axisName: 'valueAxis', argumentField: 'arg', valueField: 'val' }],
      [{ arg: 'a', val: 1 }, { arg: 'b', val: 2 }, { arg: 'c' }],
      'argumentAxis',
    );
    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: ['a', 'b', 'c'],
        orientation: 'horizontal',
        type: 'band',
      },
      valueAxis: {
        domain: [1, 2],
        orientation: 'vertical',
      },
    });
  });
});
