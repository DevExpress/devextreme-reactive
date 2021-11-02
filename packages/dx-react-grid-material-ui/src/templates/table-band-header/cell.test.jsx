import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Cell, classes } from './cell';

describe('TableCell', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should apply left border if necessary', () => {
    const tree = shallow((
      <Cell beforeBorder />
    ));

    expect(tree.is(`.${classes.beforeBorder}`))
      .toBeTruthy();
  });
});
