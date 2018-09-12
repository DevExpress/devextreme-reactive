import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import ListItemText from '@material-ui/core/ListItemText';
import { Label } from './label';

const defaultProps = { text: 'a' };

describe('Label', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Label {...defaultProps} />);
  it('should render ListItemText', () => {
    const tree = shallow(<Label {...defaultProps} />);

    expect(tree.find(ListItemText).exists())
      .toBeTruthy();
  });

  it('should render text', () => {
    const tree = shallow((
      <Label {...defaultProps} />
    ));

    expect(tree.find(ListItemText).props().children)
      .toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Label {...defaultProps} className="custom-class" />
    ));

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty />);
    const { customProperty } = tree.find(ListItemText).props();

    expect(customProperty)
      .toBeTruthy();
  });

  it('should pass the style to the element', () => {
    const tree = shallow(<Label {...defaultProps} style />);
    const { style } = tree.find(ListItemText).props();

    expect(style)
      .toBeTruthy();
  });
});
