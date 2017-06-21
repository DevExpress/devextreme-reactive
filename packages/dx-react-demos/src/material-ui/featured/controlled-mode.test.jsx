import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { ControlledModeDemo } from './controlled-mode';

injectTapEventPlugin();

describe('MUI featured: controlled mode demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ControlledModeDemo />
      </MuiThemeProvider>,
    );
  });
});
