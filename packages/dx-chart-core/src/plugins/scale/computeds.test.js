import { scaleLinear, scaleBand } from 'd3-scale';
import { computeDomains, computeExtension, getValueDomainName } from './computeds';
import { ARGUMENT_DOMAIN, VALUE_DOMAIN } from '../../constants';

describe('calculateDomain', () => {
  it('should always create argument domain', () => {
    const domains = computeDomains(
      [],
      [],
      [],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [], orientation: 'horizontal',
      },
    });
  });

  it('should create default value domain', () => {
    const domains = computeDomains(
      [],
      [{ name: 'series1', argumentField: 'arg', valueField: 'val' }],
      [{ arg: 1, val: 1 }],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 1], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from data and series options', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 1, val: 9 },
        { arg: 2, val: 2 },
        { arg: 3, val: 7 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 3], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [2, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from data and series options (temporary workaround for Stack)', () => {
    const getValueDomain = jest.fn().mockReturnValue([11, 15, 19, 23]);
    const data = [
      { arg: 1, val: 9 },
      { arg: 2, val: 2 },
      { arg: 3, val: 7 },
    ];
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val', getValueDomain,
      }],
      data,
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 3], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [11, 23], orientation: 'vertical', type: 'linear',
      },
    });
    expect(getValueDomain).toBeCalledWith(data);
  });

  it('should compute domains from data and series options, negative values', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 1, val: 9 },
        { arg: 2, val: -10 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [-10, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from data and series options, zero values', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 1, val: 0 },
        { arg: 2, val: 10 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [0, 10], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should include zero into bounds if series starts from zero', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val', isStartedFromZero: true,
      }],
      [
        { arg: 1, val: 9 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [0, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute domains from several series', () => {
    const makeItem = (arg, val1, val2, val3, val4) => ({
      arg,
      val1,
      val2,
      val3,
      val4,
    });
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val1',
      }, {
        name: 'series2', argumentField: 'arg', valueField: 'val2', axisName: 'domain1',
      }, {
        name: 'series3', argumentField: 'arg', valueField: 'val3', axisName: 'domain1',
      }, {
        name: 'series4', argumentField: 'arg', valueField: 'val4',
      }],
      [
        makeItem(1, 2, -1, 1, 2),
        makeItem(2, 3, -3, 2, 5),
        makeItem(3, 5, 0, 3, 7),
        makeItem(4, 6, 1, 1, 3),
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 4], orientation: 'horizontal', type: 'linear',
      },
      [VALUE_DOMAIN]: {
        domain: [2, 7], orientation: 'vertical', type: 'linear',
      },
      domain1: {
        domain: [-3, 3], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should compute banded domain', () => {
    const domains = computeDomains(
      [{ name: ARGUMENT_DOMAIN, type: 'band' }],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 'a', val: 1 },
        { arg: 'b', val: 2 },
        { arg: 'c' },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['a', 'b', 'c'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 2], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should guess banded domain type by data', () => {
    const domains = computeDomains(
      [],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 'a', val: 'A' },
        { arg: 'b', val: 'B' },
        { arg: 'c' },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['a', 'b', 'c'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: ['A', 'B'], orientation: 'vertical', type: 'band',
      },
    });
  });

  it('should tolerate undefined values', () => {
    const domains = computeDomains(
      [{ name: ARGUMENT_DOMAIN, type: 'band' }],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 'a', val: 1 },
        { arg: 'b', val: 2 },
        { arg: undefined },
        { arg: 'c' },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['a', 'b', 'c'],
        orientation: 'horizontal',
        type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 2],
        orientation: 'vertical',
        type: 'linear',
      },
    });
  });

  it('should take min/max from axis', () => {
    const domains = computeDomains(
      [{ name: 'domain1', min: 0, max: 10 }],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val', axisName: 'domain1',
      }],
      [
        { arg: 1, val: 3 },
        { arg: 2, val: 14 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [0, 10], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should take one of min/max from axis', () => {
    const domains = computeDomains(
      [{ name: 'domain1', max: 7 }],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val', axisName: 'domain1',
      }],
      [
        { arg: 1, val: 3 },
        { arg: 2, val: 14 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 2], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [3, 7], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should ignore min/max for band domain', () => {
    const domains = computeDomains(
      [{
        name: ARGUMENT_DOMAIN, min: 1, max: 7, type: 'band',
      }],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 'one', val: 9 },
        { arg: 'two', val: 1 },
        { arg: 'three', val: 1 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: ['one', 'two', 'three'], orientation: 'horizontal', type: 'band',
      },
      [VALUE_DOMAIN]: {
        domain: [1, 9], orientation: 'vertical', type: 'linear',
      },
    });
  });

  it('should take tickFormat from axes', () => {
    const domains = computeDomains(
      [
        { name: ARGUMENT_DOMAIN, tickFormat: 'argumentTickFormat' },
        { name: VALUE_DOMAIN, tickFormat: 'valueTickFormat' },
      ],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val',
      }],
      [
        { arg: 1, val: 9 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear', tickFormat: 'argumentTickFormat',
      },
      [VALUE_DOMAIN]: {
        domain: [9, 9], orientation: 'vertical', type: 'linear', tickFormat: 'valueTickFormat',
      },
    });
  });

  it('should ignore axes for unknown domains', () => {
    const domains = computeDomains(
      [
        { name: 'domain1', tickFormat: 'format1' },
        { name: 'domain2', tickFormat: 'format2' },
      ],
      [{
        name: 'series1', argumentField: 'arg', valueField: 'val', axisName: 'domain1',
      }],
      [
        { arg: 1, val: 9 },
      ],
    );

    expect(domains).toEqual({
      [ARGUMENT_DOMAIN]: {
        domain: [1, 1], orientation: 'horizontal', type: 'linear',
      },
      domain1: {
        domain: [9, 9], orientation: 'vertical', type: 'linear', tickFormat: 'format1',
      },
    });
  });
});

describe('computedExtension', () => {
  it('should return default extension', () => {
    expect(computeExtension([]))
      .toEqual([
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: scaleBand },
      ]);
  });

  it('should return mix of user and default extension', () => {
    expect(computeExtension([{ type: 'extraType', constructor: 'extraConstructor' }, { type: 'band', constructor: 'bandConstructor' }]))
      .toEqual([
        { type: 'extraType', constructor: 'extraConstructor' },
        { type: 'band', constructor: 'bandConstructor' },
        { type: 'linear', constructor: scaleLinear },
        { type: 'band', constructor: scaleBand },
      ]);
  });
});

describe('getValueDomainName', () => {
  it('should return argument', () => {
    expect(getValueDomainName('test-domain')).toEqual('test-domain');
  });

  it('should return default value', () => {
    expect(getValueDomainName()).toEqual('value-domain');
  });
});
