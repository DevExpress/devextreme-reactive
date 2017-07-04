import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { SeamlessImmutableDemo } from './seamless-immutable';

describe('MUI: seamless-immutable demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <SeamlessImmutableDemo />
      </MuiThemeProvider>,
    );
  });
});
