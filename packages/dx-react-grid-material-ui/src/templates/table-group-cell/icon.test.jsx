import * as React from 'react';
import { shallow } from 'enzyme';
import { Icon } from './icon';

describe('TableGroupCell', () => {
  describe('Icon', () => {
    const defaultProps = {
      classes: {},
      expanded: true,
    };

    it('should assign className to the root element', () => {
      const tree = shallow((
        <Icon
          {...defaultProps}
          className="test"
        />
      ));

      expect(tree.is('.test'))
        .toBeTruthy();
    });

    it('should pass rest props to the root component', () => {
      const tree = shallow((
        <Icon
          {...defaultProps}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
