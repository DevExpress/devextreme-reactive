import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { TableStubCell } from './table-stub-cell';

describe('TableStubCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableStubCell />);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableStubCell className="custom-class" />
    ));

    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
