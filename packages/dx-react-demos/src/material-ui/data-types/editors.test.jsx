import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Demo from './editors';

describe('MUI: custom editors demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <Demo />
      </MuiThemeProvider>,
    );
  });
});
