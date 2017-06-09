import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { ReduxIntegrationDemo } from './redux-integration';

injectTapEventPlugin();

describe('MUI featured: redux integration demo', () => {
  test('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ReduxIntegrationDemo />
      </MuiThemeProvider>,
    );
  });
});
