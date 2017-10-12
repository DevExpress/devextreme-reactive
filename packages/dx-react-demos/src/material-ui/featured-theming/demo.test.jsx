import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ThemingDemo from './demo';

describe('MUI featured: theming demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ThemingDemo />
      </MuiThemeProvider>,
    );
  });
});
