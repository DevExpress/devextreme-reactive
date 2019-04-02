import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Content } from './content';

describe('TableGroupCell', () => {
  describe('Content', () => {
    const defaultProps = {
      row: {},
      column: {},
      classes: {},
      children: null,
    };

    it('should render column title and value', () => {
      const tree = mount((
        <Content
          {...defaultProps}
          column={{ title: 'Title' }}
          row={{ value: 'Value' }}
        />
      ));

      expect(tree.text())
        .toMatch(/Title.*:.*Value/);
    });

    it('should use column name if title is not set', () => {
      const tree = mount((
        <Content
          {...defaultProps}
          column={{ name: 'Name' }}
        />
      ));

      expect(tree.text())
        .toMatch(/Name.*/);
    });

    it('should render children if any passed', () => {
      const tree = shallow((
        <Content
          {...defaultProps}
        >
          <span className="test" />
        </Content>
      ));

      expect(tree.find('.test').exists())
        .toBeTruthy();
    });

    it('should assign a className to the root element', () => {
      const tree = shallow((
        <Content
          {...defaultProps}
          className="test"
        />
      ));

      expect(tree.is('.test'))
        .toBeTruthy();
    });

    it('should cast value to string', () => {
      const tree = mount((
        <Content
          {...defaultProps}
          column={{ title: 'Title' }}
          row={{ value: undefined }}
        />
      ));

      expect(tree.text())
        .toMatch(/Title.*:.*undefined/);
    });

    it('should pass rest props to the root component', () => {
      const tree = shallow((
        <Content
          {...defaultProps}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
