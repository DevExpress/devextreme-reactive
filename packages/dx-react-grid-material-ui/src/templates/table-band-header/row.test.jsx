import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Row, classes } from './row';

describe('TableCell', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Row className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.row}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Row data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should not pass `forwardedRef` prop to the DOM', () => {
    const tree = shallow((
      <Row forwardedRef={() => {}} />
    ));
    expect(tree.props().forwardedRef).toBeFalsy();
  });
});
