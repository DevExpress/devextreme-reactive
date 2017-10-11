import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ControlledModeDemo from './demo';

describe('MUI featured: controlled mode demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ControlledModeDemo />
      </MuiThemeProvider>,
    );
  });
});
