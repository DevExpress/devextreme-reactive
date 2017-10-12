import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import UncontrolledModeDemo from './demo';

describe('MUI featured: uncontrolled mode demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <UncontrolledModeDemo />
      </MuiThemeProvider>,
    );
  });
});
