import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import IconButton from 'material-ui/IconButton';
import { TableTreeToggleButton } from './table-tree-toggle-button';

describe('TableTreeToggleButton', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableTreeToggleButton />);
  });

  it('should render IconButton', () => {
    const tree = shallow((
      <TableTreeToggleButton />
    ));

    expect(tree.find(IconButton).exists())
      .toBeTruthy();
  });

  it('should handle click with stopPropagation', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableTreeToggleButton
        visible
        onToggle={onToggle}
      />
    ));

    tree.find(IconButton).simulate('click', { stopPropagation: () => {} });

    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
