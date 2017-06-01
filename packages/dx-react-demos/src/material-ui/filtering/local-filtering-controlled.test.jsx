import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { LocalFilteringControlledDemo } from './local-filtering-controlled';

describe('MUI: local filtering controlled demo', () => {
  test('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalFilteringControlledDemo />
      </MuiThemeProvider>,
    );

    expect(true).toBeTruthy();
  });
});
