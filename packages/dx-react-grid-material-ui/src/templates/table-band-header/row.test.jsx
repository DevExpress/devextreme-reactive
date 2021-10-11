import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Row } from './row';

describe('TableCell', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Row />);
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
});
