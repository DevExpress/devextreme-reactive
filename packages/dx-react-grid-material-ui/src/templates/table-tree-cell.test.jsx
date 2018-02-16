import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { TableTreeCell } from './table-tree-cell';

describe('TableTreeCell', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableTreeCell />);
    shallow = createShallow({ dive: true });
  });

  it('should have correct text', () => {
    const tree = shallow(<TableTreeCell value="text" />);
    expect(tree.childAt(0).text()).toBe('text');
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeCell>
        <span className="test" />
      </TableTreeCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render controls if passed', () => {
    const tree = shallow((
      <TableTreeCell
        controls={<span className="test" />}
      />
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
