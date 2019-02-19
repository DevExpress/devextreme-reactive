import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { RowsBlockLayout } from './rows-block-layout';

const defaultProps = {
  rows: [
    { key: 1, rowId: 1 },
    { key: 2, rowId: 2 },
    { key: 3, rowId: 3 },
  ],
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  blockComponent: () => null,
  rowComponent: () => null,
  cellComponent: () => null,
  getCellColSpan: () => 1,
};

describe('RowsBlockLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
  });

  it('should render the "blockComponent"', () => {
    const tree = shallow((
      <RowsBlockLayout
        {...defaultProps}
      />
    ));

    expect(tree.find(defaultProps.blockComponent).exists());
  });

  it('should render RowLayout for each row', () => {
    const tree = shallow((
      <RowsBlockLayout
        {...defaultProps}
      />
    ));

    tree.find('RowLayout').forEach((component, index) => {
      expect(component.props())
        .toMatchObject({
          row: defaultProps.rows[index],
          columns: defaultProps.columns,
          rowComponent: defaultProps.rowComponent,
          cellComponent: defaultProps.cellComponent,
          getCellColSpan: defaultProps.getCellColSpan,
        });
    });
  });
});
