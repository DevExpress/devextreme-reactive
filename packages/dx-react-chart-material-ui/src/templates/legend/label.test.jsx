import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import ListItemText from '@material-ui/core/ListItemText';
import { Label } from './label';

const defaultProps = { text: 'a' };

describe('Label', () => {
  let mount;
  const classes = getClasses(<Label {...defaultProps} />);

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render ListItemText', () => {
    const tree = mount(<Label {...defaultProps} />);

    expect(tree.find(ListItemText).exists())
      .toBeTruthy();
  });

  it('should render text', () => {
    const tree = mount((
      <Label {...defaultProps} />
    ));

    expect(tree.find(ListItemText).props().children)
      .toBe('a');
  });

  it('should pass the className prop to the root element', () => {
    const tree = mount((
      <Label {...defaultProps} className="custom-class" />
    ));

    expect(tree.find(ListItemText).is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = mount(<Label {...defaultProps} custom="test" />);
    const { custom } = tree.find(ListItemText).props();

    expect(custom).toEqual('test');
  });

  it('should pass the style to the element', () => {
    const tree = mount(<Label {...defaultProps} style={{ tag: 'test' }} />);
    const { style } = tree.find(ListItemText).props();

    expect(style).toEqual({ tag: 'test' });
  });
});
