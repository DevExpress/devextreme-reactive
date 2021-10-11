import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { TableTreeContent } from './table-tree-content';

describe('TableTreeContent', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableTreeContent />);
    shallow = createShallow({ dive: true });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeContent>
        <span className="test" />
      </TableTreeContent>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeContent className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.content}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeContent data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
