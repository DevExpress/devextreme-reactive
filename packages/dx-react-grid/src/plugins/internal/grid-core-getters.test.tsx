import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridCoreGetters } from './grid-core-getters';

jest.mock('@devexpress/dx-grid-core', () => ({
  rowIdGetter: jest.fn(),
  cellValueGetter: jest.fn(),
}));

const defaultProps = {
  rows: [{ a: 1 }],
  columns: [{ name: 'a' }],
  rootComponent: () => null,
};

describe('GridCoreGetters', () => {
  beforeEach(() => {
    rowIdGetter.mockImplementation(() => 0);
    cellValueGetter.mockImplementation(() => 0);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide rows', () => {
    const tree = mount((
      <PluginHost>
        <GridCoreGetters
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).rows)
      .toBe(defaultProps.rows);
  });

  it('should provide getRowId', () => {
    const getRowId = () => '';

    const tree = mount((
      <PluginHost>
        <GridCoreGetters
          {...defaultProps}
          getRowId={getRowId}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(rowIdGetter)
      .toBeCalledWith(getRowId, defaultProps.rows);
    expect(getComputedState(tree).getRowId)
      .toBe(rowIdGetter());
  });

  it('should provide getCellValue', () => {
    const getCellValue = () => {};

    const tree = mount((
      <PluginHost>
        <GridCoreGetters
          {...defaultProps}
          getCellValue={getCellValue}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(cellValueGetter)
      .toBeCalledWith(getCellValue, defaultProps.columns);
    expect(getComputedState(tree).getCellValue)
      .toEqual(cellValueGetter());
  });
});
