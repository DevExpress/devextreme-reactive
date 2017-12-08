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

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectAllCell
        column={{
          name: 'Test',
        }}
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(onToggle)
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
