import * as React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './root';

describe('DateNavigator', () => {
  describe('Calendar', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Calendar data={{ a: 1 }}>
          <div />
        </Calendar>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
