import * as React from 'react';
import { shallow } from 'enzyme';
import { Container } from './container';

describe('Container', () => {
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
