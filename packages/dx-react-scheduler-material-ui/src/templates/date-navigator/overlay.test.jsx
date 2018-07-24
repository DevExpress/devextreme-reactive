import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';

describe('DateNavigator', () => {
  const defaultProps = {
    onHide: () => undefined,
  };
  beforeAll(() => {
  });
  describe('Overlay', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Overlay {...defaultProps} data={{ a: 1 }}>
          <div />
        </Overlay>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
