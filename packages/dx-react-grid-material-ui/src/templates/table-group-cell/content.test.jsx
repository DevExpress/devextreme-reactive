import * as React from 'react';
import { shallow } from 'enzyme';
import { Content } from './content';

describe('Content', () => {
  const defaultProps = {
    row: {},
    column: {},
    className: '',
    children: null,
  };

  it('should render column title and value', () => {
    const tree = shallow((
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
    const tree = shallow((
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
});
