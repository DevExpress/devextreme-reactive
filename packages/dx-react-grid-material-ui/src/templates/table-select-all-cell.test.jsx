import React from 'react';
import { Checkbox } from 'material-ui';
import { createMount, createShallow, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableSelectAllCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableSelectAllCell />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = shallow((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        someSelected
      />
    ));

    expect(tree.find(Checkbox).prop('indeterminate'))
      .toBeTruthy();
  });

  it('should not call the `toggleAll` function on cell click if selection is not available', () => {
    const toggleAll = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        toggleAll={toggleAll}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(toggleAll)
      .not.toHaveBeenCalled();
  });

  it('should call the `toggleAll` function on cell click if selection is available', () => {
    const toggleAll = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        selectionAvailable
        toggleAll={toggleAll}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(toggleAll)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
