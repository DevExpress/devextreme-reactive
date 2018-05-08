import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

const defaultProps = { text: 'a' };

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow((
      <Label {...defaultProps} />
    ));

    expect(tree.text())
      .toBe('a');
    expect(tree.find('span'))
      .toBeDefined();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty />);

    const { customProperty } = tree.find('span').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
