import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { LocalFilterRowDemo } from './local-filter-row';

describe('MUI: local filter row demo', () => {
  test('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalFilterRowDemo />
      </MuiThemeProvider>,
    );

    expect(true).toBeTruthy();
  });
});
