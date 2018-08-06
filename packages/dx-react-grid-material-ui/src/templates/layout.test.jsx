import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './layout';

describe('Layout', () => {
  describe('Root', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Root className="custom-class">
          <div />
        </Root>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root data={{ a: 1 }}>
          <div />
        </Root>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
