import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ThemingDemo from './demo';

injectTapEventPlugin();

describe('MUI featured: theming demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ThemingDemo />
      </MuiThemeProvider>,
    );
  });
});
