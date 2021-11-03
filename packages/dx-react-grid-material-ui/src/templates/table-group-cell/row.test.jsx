import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Row, classes } from './row';

describe('TableGroupRow', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Row
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should render children if any passed', () => {
    const tree = shallow((
      <Row>
        <span className="test" />
      </Row>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should add the passed className to the root element', () => {
    const tree = shallow((
      <Row
        className="custom"
      />
    ));

    expect(tree.hasClass('custom'))
      .toBeTruthy();
    expect(tree.hasClass(classes.row))
      .toBeTruthy();
  });
});
