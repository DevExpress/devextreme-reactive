import { domains } from './computeds';

describe('calculateDomain', () => {
  const argumentAxis = { name: 'argumentAxis' };
  const valueAxis = { name: 'valueAxis' };

  it('should be equal axes min max option', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, min: 0, max: 10 }],
      [],
      [],
      'argumentAxis',
      {},
    );
    const { domain } = calculatedDomains.argumentAxis;
    expect(domain).toEqual([0, 10]);
  });


  it('should be computed from data and series option', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-end': 9,
      }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 1], orientation: 'horizontal', type: undefined },
      valueAxis: { domain: [9, 9], orientation: 'vertical', type: undefined },
    });
  });

  it('should be computed from data and series option, startFromZero option set for value axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-end': 9,
      }],
      'argumentAxis',
      { valueAxis: true },
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 1], orientation: 'horizontal', type: undefined },
      valueAxis: { domain: [0, 9], orientation: 'vertical', type: undefined },
    });
  });

  it('should be computed from data and series option, axes is empty array', () => {
    const calculatedDomains = domains(
      [],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-end': 9 }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 1], orientation: 'horizontal' },
      valueAxis: { domain: [9, 9], orientation: 'vertical' },
    });
  });

  it('should be computed from data and series option with band type option', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, type: 'band' }, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 'a', val: 1, 'val-name-end': 1 }, { arg: 'b', val: 2, 'val-name-end': 2 }, { arg: 'c' }],
      'argumentAxis',
      {},
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

  it('should be computed from data and min/max of axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, { ...valueAxis, min: 3, max: 7 }],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-end': 9 }, { arg: 4, val: 1, 'val-name-end': 1 }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 4], orientation: 'horizontal' },
      valueAxis: { domain: [3, 7], orientation: 'vertical' },
    });
  });

  it('should be computed from data and max of axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, { ...valueAxis, max: 7 }],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-end': 9 }, { arg: 4, val: 1, 'val-name-end': 1 }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: [1, 4], orientation: 'horizontal' },
      valueAxis: { domain: [1, 7], orientation: 'vertical' },
    });
  });

  it('should be computed from data, type is band and axis min/max is ignore', () => {
    const calculatedDomains = domains(
      [{
        ...argumentAxis, min: 1, max: 7, type: 'band',
      },
      valueAxis,
      ],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 'one', val: 9, 'val-name-end': 9 },
        { arg: 'two', val: 1, 'val-name-end': 1 },
        { arg: 'three', val: 1, 'val-name-end': 1 }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: { domain: ['one', 'two', 'three'], orientation: 'horizontal', type: 'band' },
      valueAxis: { domain: [1, 9], orientation: 'vertical' },
    });
  });
});
