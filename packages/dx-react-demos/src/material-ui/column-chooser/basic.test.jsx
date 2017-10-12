import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import BasicDemo from './basic';

describe('MUI column chooser: basic demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <BasicDemo />
      </MuiThemeProvider>,
    );
  });
});
