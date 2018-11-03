import * as React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
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

    const { component, variant, children: text } = tree.find(Typography).props();
    expect(component)
      .toBe('h3');
    expect(variant)
      .toBe('h5');
    expect(text)
      .toBe('chart');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Text {...defaultProps} customProperty />);
    const { customProperty } = tree.find(Typography).props();
    expect(customProperty)
      .toBeTruthy();
  });
});
