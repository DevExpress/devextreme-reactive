import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { ImmutableJSDemo } from './immutablejs';

describe('MUI: immutablejs demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ImmutableJSDemo />
      </MuiThemeProvider>,
    );
  });
});
