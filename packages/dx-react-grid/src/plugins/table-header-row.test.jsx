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
  tableRowsWithHeading,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';
import { TableHeaderRow } from './table-header-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
}));

const defaultPluginProps = {
  headerCellTemplate: () => null,
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
    tableRowsWithHeading.mockImplementation(() => 'tableRowsWithHeading');
    isHeadingTableCell.mockImplementation(() => false);
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
          <TableHeaderRow
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

      expect(tableRowsWithHeading)
        .toBeCalledWith('tableHeaderRows');
      expect(tableHeaderRows)
        .toBe('tableRowsWithHeading');
    });
  });

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const headerCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: { name: 'a' } }, style: {} }}
          />
        </Template>
        <TableHeaderRow
          {...defaultPluginProps}
          headerCellTemplate={headerCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeadingTableCell)
      .toBeCalledWith({ original: 'row' }, { original: { name: 'a' } });
    expect(headerCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({ row: 'row' }));
    expect(headerCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        column: { name: 'a' },
        style: {},
      }));
  });
});
