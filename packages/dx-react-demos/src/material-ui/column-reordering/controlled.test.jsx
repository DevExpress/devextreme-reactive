import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ControlledDemo from './controlled';

describe('MUI column reordering: controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
