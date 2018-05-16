import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ListItemText from '@material-ui/core/ListItemText';
import { Label } from './label';

const defaultProps = { text: 'a' };

describe('Label', () => {
  it('should render ListItemText', () => {
    const tree = shallow(<Label {...defaultProps} />);

    expect(tree.find(ListItemText).exists())
      .toBeTruthy();
  });

  it('should render text', () => {
    const tree = mount((
      <Label {...defaultProps} />
    ));

    expect(tree.find(ListItemText).text().trim())
      .toBe('a');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty />);
    const { customProperty } = tree.find(ListItemText).props();

    expect(customProperty)
      .toBeTruthy();
  });
});
