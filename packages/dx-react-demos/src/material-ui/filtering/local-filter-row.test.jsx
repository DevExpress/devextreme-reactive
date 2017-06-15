import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { LocalFilterRowDemo } from './local-filter-row';

describe('MUI: local filter row demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalFilterRowDemo />
      </MuiThemeProvider>,
    );
  });
});
