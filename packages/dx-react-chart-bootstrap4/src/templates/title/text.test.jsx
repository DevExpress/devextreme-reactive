import * as React from 'react';
import { mount } from 'enzyme';
import { Text } from './text';

describe('Text', () => {
  const defaultProps = {
    text: 'chart',
  };

  it('should render root element', () => {
    const tree = mount((
      <Text
        {...defaultProps}
      />
    ));

    const text = tree.find('h3').text();
    expect(text)
      .toBe('chart');
  });

  it('should pass the rest property to the root element', () => {
    const tree = mount(<Text {...defaultProps} className="custom-class" />);
    expect(tree.find('h3').is('.custom-class.w-100.text-center.mb-3'))
      .toBeTruthy();
  });
});
