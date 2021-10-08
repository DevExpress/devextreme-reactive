import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Content } from './content';

const mockDefaultTheme = createTheme();
jest.mock('@mui/private-theming/useTheme', () => () => mockDefaultTheme);

describe('Content', () => {
  const defaultProps = {
    text: 'tooltip-text',
  };
  const mount = createMount({ dive: true });

  it('should render content', () => {
    const tree = mount((
      <Content
        {...defaultProps}
      />
    ));
    expect(tree.find(Typography).props().children)
      .toBe('tooltip-text');
  });
});
