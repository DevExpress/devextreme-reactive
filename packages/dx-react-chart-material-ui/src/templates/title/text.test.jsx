import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { Typography } from '@mui/material';
import { classes } from '../utils';
import { Text } from './text';

describe('Text', () => {
  const defaultProps = {
    text: 'chart',
  };
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render root element', () => {
    const tree = mount(<Text {...defaultProps} />);
    const { component, variant, children: text } = tree.find(Typography).props();
    expect(component)
      .toBe('h3');
    expect(variant)
      .toBe('h5');
    expect(text)
      .toBe('chart');
  });

  it('should pass the rest property to the root element', () => {
    const tree = mount(<Text {...defaultProps} className="custom-class" />);
    expect(tree.find(Typography).is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });
});
