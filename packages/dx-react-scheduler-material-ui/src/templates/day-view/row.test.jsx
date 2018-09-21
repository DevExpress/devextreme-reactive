import * as React from 'react';
import { shallow } from 'enzyme';
import { Row } from './row';

describe('Week View Row', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Row data={{ a: 1 }}>
        <div />
      </Row>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should render children', () => {
    const tree = shallow((
      <Row>
        <div className="child" />
      </Row>
    ));

    expect(tree.find('.child').exists())
      .toBeTruthy();
  });
});
