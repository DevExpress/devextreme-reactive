import React from 'react';
import { shallow } from 'enzyme';
import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { RowLayout } from './row-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  getTableRowColumnsWithColSpan: jest.fn(),
}));

const defaultRow = { key: 1, rowId: 1, height: 20 };
const defaultColumns = [
  { key: 'a', column: { name: 'a' } },
  { key: 'b', column: { name: 'b' } },
  { key: 'c', column: { name: 'c' } },
  { key: 'd', column: { name: 'd' } },
];

describe('RowLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    getTableRowColumnsWithColSpan.mockImplementation(() => defaultColumns);
  });

  afterEach(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  it('should render the "rowTemplate" with correct properties', () => {
    const rowTemplate = () => null;

    const tree = shallow((
      <RowLayout
        row={defaultRow}
        columns={defaultColumns}
        rowTemplate={rowTemplate}
        cellTemplate={() => null}
      />
    ));

    expect(tree.find('TemplateRenderer').at(0).props())
      .toMatchObject({
        template: rowTemplate,
        params: {
          tableRow: defaultRow,
          style: { height: '20px' },
        },
      });
  });

  it('should render the "cellTemplate" for each column', () => {
    const cellTemplate = () => null;

    const tree = shallow((
      <RowLayout
        row={defaultRow}
        columns={defaultColumns}
        rowTemplate={() => null}
        cellTemplate={cellTemplate}
      />
    ));

    tree.find('TemplateRenderer').at(0).children().forEach((component, index) => {
      const column = defaultColumns[index];
      expect(component.props())
        .toMatchObject({
          template: cellTemplate,
          params: {
            tableRow: defaultRow,
            tableColumn: column,
          },
        });
    });
  });

  it('can span columns', () => {
    const column = { key: 'b', column: { name: 'b' } };
    getTableRowColumnsWithColSpan.mockImplementation(() => [{ ...column, colspan: 2 }]);

    const tree = shallow((
      <RowLayout
        row={defaultRow}
        columns={[column]}
        rowTemplate={() => null}
        cellTemplate={() => null}
      />
    ));

    expect(tree.find('TemplateRenderer').at(1).props())
      .toMatchObject({
        params: {
          tableRow: defaultRow,
          tableColumn: { ...column, colspan: 2 },
        },
      });
  });
});
