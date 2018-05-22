import * as React from 'react';
import { shallow } from 'enzyme';
import { Text } from './text';

describe('Text', () => {
  const defaultProps = {
    text: 'chart',
  };

  it('should render root element', () => {
    const tree = shallow((
      <Text
        {...defaultProps}
      />
    ));

    const text = tree.find('h3').text();
    expect(text)
      .toBe('chart');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Text {...defaultProps} customProperty />);
    const { customProperty } = tree.find('h3').props();
    expect(customProperty)
      .toBeTruthy();
  });
});
