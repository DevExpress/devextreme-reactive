import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import {
  defaultSummaryCalculator,
  totalSummaryValues,
  groupSummaryValues,
  treeSummaryValues,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { IntegratedSummary } from './integrated-summary';

jest.mock('@devexpress/dx-grid-core', () => ({
  defaultSummaryCalculator: jest.fn(),
  totalSummaryValues: jest.fn(),
  groupSummaryValues: jest.fn(),
  treeSummaryValues: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    totalSummaryItems: [{ columnName: 'a', type: 'count' }],
    groupSummaryItems: [{ columnName: 'b', type: 'count' }],
    treeSummaryItems: [{ columnName: 'c', type: 'count' }],
    getCellValue: () => {},
    getCollapsedRows: () => [],
    isGroupRow: () => false,
    getRowLevelKey: () => undefined,
    getRowId: () => 1,
  },
  plugins: ['SummaryState'],
};

describe('IntegratedSummary', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    defaultSummaryCalculator.mockImplementation(() => ('defaultSummaryCalculator'));
    totalSummaryValues.mockImplementation(() => ('totalSummaryValues'));
    groupSummaryValues.mockImplementation(() => ('groupSummaryValues'));
    treeSummaryValues.mockImplementation(() => ('treeSummaryValues'));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide totalSummaryValues getter', () => {
    const calculator = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSummary
          calculator={calculator}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalSummaryValues)
      .toBe(totalSummaryValues());

    expect(totalSummaryValues)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.totalSummaryItems,
        defaultDeps.getter.getCellValue,
        defaultDeps.getter.getRowLevelKey,
        defaultDeps.getter.isGroupRow,
        defaultDeps.getter.getCollapsedRows,
        calculator,
      );
  });

  it('should provide groupSummaryValues getter', () => {
    const calculator = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSummary
          calculator={calculator}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).groupSummaryValues)
      .toBe(groupSummaryValues());

    expect(groupSummaryValues)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.groupSummaryItems,
        defaultDeps.getter.getCellValue,
        defaultDeps.getter.getRowLevelKey,
        defaultDeps.getter.isGroupRow,
        defaultDeps.getter.getCollapsedRows,
        calculator,
      );
  });

  it('should provide treeSummaryValues getter', () => {
    const calculator = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSummary
          calculator={calculator}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).treeSummaryValues)
      .toBe(treeSummaryValues());

    expect(treeSummaryValues)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.treeSummaryItems,
        defaultDeps.getter.getCellValue,
        defaultDeps.getter.getRowLevelKey,
        defaultDeps.getter.isGroupRow,
        defaultDeps.getter.getRowId,
        calculator,
      );
  });
});
