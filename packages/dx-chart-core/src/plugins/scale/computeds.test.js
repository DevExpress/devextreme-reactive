import { scaleLinear, scaleBand } from 'd3-scale';
import { domains, computedExtension } from './computeds';

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
        arg: 1, val: 9, 'val-name-stack': [0, 9],
      }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [9, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data, negative values', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-stack': [0, 9],
      }, {
        arg: 2, val: -10, 'val-name-stack': [0, -10],
      }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [-10, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data with zero values', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 0, 'val-name-stack': [0, 0],
      }, {
        arg: 2, val: 10, 'val-name-stack': [0, 10],
      }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [0, 10], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option, startFromZero option set for value axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-stack': [0, 9],
      }],
      'argumentAxis',
      { valueAxis: true },
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [0, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option, startFromZero option set for value axis, no series component', () => {
    const calculatedDomains = domains(
      undefined,
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-stack': [0, 9],
      }],
      'argumentAxis',
      { valueAxis: true },
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [0, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option, axes is empty array', () => {
    const calculatedDomains = domains(
      [],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-stack': [0, 9] }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [9, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option with band type option', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, type: 'band' }, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 'a', val: 1, 'val-name-stack': [0, 1] }, { arg: 'b', val: 2, 'val-name-stack': [0, 2] }, { arg: 'c' }],
      'argumentAxis',
      {},
    );
    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: ['a', 'b', 'c'],
        orientation: 'horizontal',
        type: 'band',
        tickFormat: undefined,
      },
      valueAxis: {
        domain: [1, 2],
        orientation: 'vertical',
        type: 'linear',
        tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option with band type, one argument is undefined', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, type: 'band' }, valueAxis],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 'a', val: 1, 'val-name-stack': [0, 1] }, { arg: 'b', val: 2, 'val-name-stack': [0, 2] }, { arg: undefined }],
      'argumentAxis',
      {},
    );
    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: ['a', 'b'],
        orientation: 'horizontal',
        type: 'band',
        tickFormat: undefined,
      },
      valueAxis: {
        domain: [1, 2],
        orientation: 'vertical',
        type: 'linear',
        tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option, type is not set, arguments are string', () => {
    const calculatedDomains = domains(
      undefined,
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 'c' }, { arg: 'a', val: 1, 'val-name-stack': [0, 1] }, { arg: 'b', val: 2, 'val-name-stack': [0, 2] }],
      'argumentAxis',
      {},
    );
    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: ['c', 'a', 'b'],
        orientation: 'horizontal',
        type: 'band',
        tickFormat: undefined,
      },
      valueAxis: {
        domain: [1, 2],
        orientation: 'vertical',
        type: 'linear',
        tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and min/max of axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, { ...valueAxis, min: 3, max: 7 }],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-stack': [0, 9] }, { arg: 4, val: 1, 'val-name-stack': [0, 1] }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 4], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [3, 7], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and max of axis', () => {
    const calculatedDomains = domains(
      [argumentAxis, { ...valueAxis, max: 7 }],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{ arg: 1, val: 9, 'val-name-stack': [0, 9] }, { arg: 4, val: 1, 'val-name-stack': [0, 1] }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 4], orientation: 'horizontal', type: 'linear', tickFormat: undefined,
      },
      valueAxis: {
        domain: [1, 7], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
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
      [{ arg: 'one', val: 9, 'val-name-stack': [0, 9] },
        { arg: 'two', val: 1, 'val-name-stack': [0, 1] },
        { arg: 'three', val: 1, 'val-name-stack': [0, 1] }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: ['one', 'two', 'three'], orientation: 'horizontal', type: 'band', tickFormat: undefined,
      },
      valueAxis: {
        domain: [1, 9], orientation: 'vertical', type: 'linear', tickFormat: undefined,
      },
    });
  });

  it('should be computed from data and series option, tickFormat is specify', () => {
    const calculatedDomains = domains(
      [{ ...argumentAxis, tickFormat: 'argumentTickFormat' }, { ...valueAxis, tickFormat: 'valueTickFormat' }],
      [{
        axisName: 'valueAxis', argumentField: 'arg', valueField: 'val', name: 'name',
      }],
      [{
        arg: 1, val: 9, 'val-name-stack': [0, 9],
      }],
      'argumentAxis',
      {},
    );

    expect(calculatedDomains).toEqual({
      argumentAxis: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: 'argumentTickFormat',
      },
      valueAxis: {
        domain: [9, 9], orientation: 'vertical', type: 'linear', tickFormat: 'valueTickFormat',
      },
    });
  });
});

describe('computedExtension', () => {
  it('should return default extension', () => {
    expect(computedExtension([]))
      .toEqual([
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: scaleBand },
      ]);
  });

  it('should return mix of user and default extension', () => {
    expect(computedExtension([{ type: 'extraType', constructor: 'extraConstructor' }, { type: 'band', constructor: 'bandConstructor' }]))
      .toEqual([
        { type: 'extraType', constructor: 'extraConstructor' },
        { type: 'band', constructor: 'bandConstructor' },
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: scaleBand },
      ]);
  });
});
