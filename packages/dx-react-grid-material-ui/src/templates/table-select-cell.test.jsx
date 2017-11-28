import React from 'react';
import { Checkbox } from 'material-ui';
import { createMount, createShallow, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectCell } from './table-select-cell';

describe('TableSelectCell', () => {
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableSelectCell />);
  });

  it('should call the `changeSelected` function on cell click if selection is available', () => {
    const changeSelected = jest.fn();
    const tree = mount((
      <TableSelectCell
        changeSelected={changeSelected}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(changeSelected)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSelectCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
