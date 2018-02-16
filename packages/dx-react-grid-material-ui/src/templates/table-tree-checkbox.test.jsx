import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableTreeCheckbox } from './table-tree-checkbox';

describe('TableTreeCheckbox', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableTreeCheckbox />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = shallow((
      <TableTreeCheckbox
        someSelected
      />
    ));

    expect(tree.find(Checkbox).prop('indeterminate'))
      .toBeTruthy();
  });

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableTreeCheckbox
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click', { stopPropagation: () => {} });

    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableTreeCheckbox
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click', { stopPropagation: () => {} });

    expect(onToggle)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
