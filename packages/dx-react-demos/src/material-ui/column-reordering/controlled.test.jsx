import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { ControlledDemo } from './controlled';

injectTapEventPlugin();

describe('MUI column reordering: controlled demo', () => {
  test('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
