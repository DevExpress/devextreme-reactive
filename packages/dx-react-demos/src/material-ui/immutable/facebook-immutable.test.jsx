import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { FacebookImmutableDemo } from './facebook-immutable';

describe('MUI: facebook immutable demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <FacebookImmutableDemo />
      </MuiThemeProvider>,
    );
  });
});
