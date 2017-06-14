import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { LocalFilteringControlledDemo } from './local-filtering-controlled';

describe('MUI: local filtering controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalFilteringControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
