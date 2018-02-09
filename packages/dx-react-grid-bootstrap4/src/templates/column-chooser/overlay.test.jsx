import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const toggle = jest.fn();
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Overlay
        className="custom-class"
        onHide={() => {}}
        toggle={toggle}
        target={{}}
      >
        <div />
      </Overlay>
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Overlay
        data={{ a: 1 }}
        onHide={() => {}}
        toggle={toggle}
        target={{}}
      >
        <div />
      </Overlay>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
