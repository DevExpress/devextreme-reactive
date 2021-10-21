import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { createShallow, setupConsole } from '@devexpress/dx-testing';

import { TableTreeCheckbox } from './table-tree-checkbox';

describe('TableTreeCheckbox', () => {
  let resetConsole;
  let mount;
  let shallow;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    shallow = createShallow({ dive: true });
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render indeterminate state checkbox if the `indeterminate` property is true', () => {
    const tree = shallow((
      <TableTreeCheckbox
        indeterminate
      />
    ));

    expect(tree.find(Checkbox).prop('indeterminate'))
      .toBeTruthy();
  });

  it('should not fire the `onChange` event on cell click if selection is not available', () => {
    const onChange = jest.fn();
    const tree = shallow((
      <TableTreeCheckbox
        disabled
        onChange={onChange}
      />
    ));
    tree.find(Checkbox).simulate('click', { stopPropagation: () => {} });

    expect(onChange)
      .not.toHaveBeenCalled();
  });

  it('should fire the `onChange` event on cell click if selection is available', () => {
    const onChange = jest.fn();
    const tree = shallow((
      <TableTreeCheckbox
        onChange={onChange}
      />
    ));
    tree.find(Checkbox).simulate('click', { stopPropagation: () => {} });

    expect(onChange)
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
