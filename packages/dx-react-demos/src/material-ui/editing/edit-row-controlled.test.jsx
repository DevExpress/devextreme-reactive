import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { EditRowControlledDemo } from './edit-row-controlled';

describe('MUI: edit row controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <EditRowControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
