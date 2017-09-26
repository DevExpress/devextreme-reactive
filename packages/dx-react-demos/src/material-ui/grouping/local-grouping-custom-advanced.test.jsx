import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingCustomAdvanced from './local-grouping-custom-advanced';

describe('MUI: grouping with custom advanced', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingCustomAdvanced />
      </MuiThemeProvider>,
    );
  });
});
