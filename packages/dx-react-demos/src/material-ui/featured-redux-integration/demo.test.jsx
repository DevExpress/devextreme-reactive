import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ReduxIntegrationDemo from './demo';

describe('MUI featured: redux integration demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ReduxIntegrationDemo />
      </MuiThemeProvider>,
    );
  });
});
