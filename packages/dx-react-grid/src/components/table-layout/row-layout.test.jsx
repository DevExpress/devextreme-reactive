import React from 'react';
import { shallow } from 'enzyme';
import { TABLE_DATA_TYPE, getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { RowLayout } from './row-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_DATA_TYPE: 'd',
  getTableRowColumnsWithColSpan: jest.fn(),
}));

const defaultRow = { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1, height: 20 };
const defaultColumns = [
  { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
  { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
  { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
  { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
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

    const tree = shallow(
      <RowLayout
        row={defaultRow}
        columns={defaultColumns}
        rowTemplate={rowTemplate}
        cellTemplate={() => null}
      />,
    );

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

    const tree = shallow(
      <RowLayout
        row={defaultRow}
        columns={defaultColumns}
        rowTemplate={() => null}
        cellTemplate={cellTemplate}
      />,
    );

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

  it('should pass styles to columns', () => {
    const columns = [{ key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' }, width: 100 }];
    getTableRowColumnsWithColSpan.mockImplementation(() => columns);

    const tree = shallow(
      <RowLayout
        row={defaultRow}
        columns={columns}
        rowTemplate={() => null}
        cellTemplate={() => null}
      />,
    );

    expect(tree.find('TemplateRenderer').at(1).props())
      .toMatchObject({
        params: {
          tableRow: defaultRow,
          tableColumn: columns[0],
          style: { width: '100px' },
        },
      });
  })

  it('can span columns', () => {
    const column = { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } };
    getTableRowColumnsWithColSpan.mockImplementation(() => [{ ...column, colspan: 2 }]);

    const tree = shallow(
      <RowLayout
        row={defaultRow}
        columns={[column]}
        rowTemplate={() => null}
        cellTemplate={() => null}
      />,
    );

    expect(tree.find('TemplateRenderer').at(1).props())
      .toMatchObject({
        params: {
          tableRow: defaultRow,
          tableColumn: { ...column, colspan: 2 },
        },
      });
  });
});
