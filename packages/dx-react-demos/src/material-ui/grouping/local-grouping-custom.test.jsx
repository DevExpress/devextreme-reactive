import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingCustom from './local-grouping-custom';

describe('MUI: grouping with custom', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingCustom />
      </MuiThemeProvider>,
    );
  });
});
