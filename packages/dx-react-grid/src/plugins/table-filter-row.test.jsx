import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableHeaderRowsWithFilter,
  isFilterTableCell,
} from '@devexpress/dx-grid-core';
import { TableFilterRow } from './table-filter-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableHeaderRowsWithFilter: jest.fn(),
  isFilterTableCell: jest.fn(),
  getColumnFilterConfig: jest.fn(),
}));

const defaultPluginProps = {
  filterCellTemplate: () => null,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableHeaderRowsWithFilter.mockImplementation(() => 'tableHeaderRowsWithFilter');
    isFilterTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      let tableHeaderRows = null;
      mount(
        <PluginHost>
          <Getter name="tableHeaderRows" value="tableHeaderRows" />
          <TableFilterRow
            {...defaultPluginProps}
          />
          <Template
            name="root"
            connectGetters={getter => (tableHeaderRows = getter('tableHeaderRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableHeaderRowsWithFilter)
        .toBeCalledWith('tableHeaderRows', undefined);
      expect(tableHeaderRows)
        .toBe('tableHeaderRowsWithFilter');
    });
  });

  it('should render heading cell on user-defined column and filter row intersection', () => {
    isFilterTableCell.mockImplementation(() => true);

    const filterCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: { name: 'a' } }, style: {} }}
          />
        </Template>
        <TableFilterRow
          {...defaultPluginProps}
          filterCellTemplate={filterCellTemplate}
        />
      </PluginHost>,
    );

    expect(isFilterTableCell)
      .toBeCalledWith({ original: 'row' }, { original: { name: 'a' } });
    expect(filterCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ row: 'row' }));
    expect(filterCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        column: { name: 'a' },
        style: {},
      }));
  });
});
