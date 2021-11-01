import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import Paper from '@mui/material/Paper';
import { classes } from '../utils';
import { Sheet } from './sheet';

describe('Sheet', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Sheet', () => {
    const tree = mount((
      <Sheet />
    ));
    expect(tree.find(Paper).is(`.${classes.root}`)).toBeTruthy();
  });
});
