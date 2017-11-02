import React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { RowsBlockLayout } from './rows-block-layout';

const defaultRows = [
  { key: 1, rowId: 1 },
  { key: 2, rowId: 2 },
  { key: 3, rowId: 3 },
];
const defaultColumns = [
  { key: 'a', column: { name: 'a' } },
  { key: 'b', column: { name: 'b' } },
  { key: 'c', column: { name: 'c' } },
  { key: 'd', column: { name: 'd' } },
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
