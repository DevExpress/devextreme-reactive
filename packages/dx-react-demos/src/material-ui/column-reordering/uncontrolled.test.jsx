import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import UncontrolledDemo from './uncontrolled';

injectTapEventPlugin();

describe('MUI column reordering: controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <UncontrolledDemo />
      </MuiThemeProvider>,
    );
  });
});
