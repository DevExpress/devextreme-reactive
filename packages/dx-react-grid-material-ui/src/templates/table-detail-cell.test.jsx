import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { TableDetailCell, classes } from './table-detail-cell';

describe('TableDetailCell', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        template={() => (<div />)}
        className="custom-class"
      />
    ));

    expect(tree.is(`.${classes.active}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableDetailCell
        template={() => (<div />)}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
