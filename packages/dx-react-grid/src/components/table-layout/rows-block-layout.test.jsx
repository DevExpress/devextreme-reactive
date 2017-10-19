import React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TABLE_DATA_TYPE } from '@devexpress/dx-grid-core';
import { RowsBlockLayout } from './rows-block-layout';

const defaultRows = [
  { key: `${TABLE_DATA_TYPE}_1`, type: TABLE_DATA_TYPE, rowId: 1 },
  { key: `${TABLE_DATA_TYPE}_2`, type: TABLE_DATA_TYPE, rowId: 2 },
  { key: `${TABLE_DATA_TYPE}_3`, type: TABLE_DATA_TYPE, rowId: 3 },
];
const defaultColumns = [
  { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
  { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
  { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
  { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
];

describe('RowsBlockLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
  });

  it('should render the "blockTemplate', () => {
    const blockTemplate = () => null;

    const tree = shallow((
      <RowsBlockLayout
        columns={defaultColumns}
        rows={defaultRows}
        blockTemplate={blockTemplate}
        rowTemplate={() => null}
        cellTemplate={() => null}
      />
    ));

    expect(tree.find('TemplateRenderer').props())
      .toMatchObject({
        template: blockTemplate,
      });
  });

  it('should render RowLayout for each row', () => {
    const rowTemplate = () => null;
    const cellTemplate = () => null;

    const tree = shallow((
      <RowsBlockLayout
        columns={defaultColumns}
        rows={defaultRows}
        blockTemplate={() => null}
        rowTemplate={rowTemplate}
        cellTemplate={cellTemplate}
      />
    ));

    tree.find('RowLayout').forEach((component, index) => {
      const row = defaultRows[index];
      expect(component.props())
        .toMatchObject({
          row,
          columns: defaultColumns,
          rowTemplate,
          cellTemplate,
        });
    });
  });
});
