import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './layout';

describe('Layout', () => {
  describe('Root', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
