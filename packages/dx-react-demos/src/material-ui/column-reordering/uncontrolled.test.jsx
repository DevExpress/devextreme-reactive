import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import UncontrolledDemo from './uncontrolled';

describe('MUI column reordering: controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <UncontrolledDemo />
      </MuiThemeProvider>,
    );
  });
});
