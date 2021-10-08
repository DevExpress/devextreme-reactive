import * as React from 'react';
import { createMount, getClasses } from '@devexpress/dx-testing';
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Sheet } from './sheet';

const mockDefaultTheme = createTheme();
jest.mock('@mui/private-theming/useTheme', () => () => mockDefaultTheme);

describe('Sheet', () => {
  let mount;
  const classes = getClasses(<Sheet />);

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
    expect(tree.find(Paper).props()).toMatchObject({
      className: `${classes.root}`,
    });
  });
});
