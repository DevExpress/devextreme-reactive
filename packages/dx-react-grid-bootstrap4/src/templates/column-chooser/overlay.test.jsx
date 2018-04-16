import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';

const defaultProps = {
  onHide: () => {},
  target: () => {},
};

describe('Overlay', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Overlay
        className="custom-class"
        {...defaultProps}
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
        {...defaultProps}
      >
        <div />
      </Overlay>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
