import * as React from 'react';
import { shallow } from 'enzyme';
import { Container } from './container';

describe('Container', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Container
        className="custom-class"
      >
        <div />
      </Container>
    ));

    expect(tree.is('.list-group'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Container
        data={{ a: 1 }}
      >
        <div />
      </Container>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
