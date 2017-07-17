import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import EditRowDemo from './edit-row';

describe('MUI: edit row controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <EditRowDemo />
      </MuiThemeProvider>,
    );
  });
});
