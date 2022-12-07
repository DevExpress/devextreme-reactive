import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { IconButton } from '@mui/material';
import { TableTreeExpandButton } from './table-tree-expand-button';

describe('TableTreeExpandButton', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render IconButton', () => {
    const tree = shallow((
      <TableTreeExpandButton />
    ));

    expect(tree.find(IconButton).exists())
      .toBeTruthy();
  });

  it('should handle click with stopPropagation', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableTreeExpandButton
        visible
        onToggle={onToggle}
      />
    ));

    tree.find(IconButton).simulate('click', { stopPropagation: () => {} });

    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('should set tabIndex to -1 when invisible', () => {
    const tree = shallow((
      <TableTreeExpandButton
        visible={false}
      />
    ));

    tree.find(IconButton).simulate('click', { stopPropagation: () => {} });

    expect(tree.find(IconButton).prop('tabIndex'))
      .toBe(-1);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeExpandButton
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeExpandButton
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
