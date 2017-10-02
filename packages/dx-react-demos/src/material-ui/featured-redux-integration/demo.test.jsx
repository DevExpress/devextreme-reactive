import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ReduxIntegrationDemo from './demo';

injectTapEventPlugin();

describe('MUI featured: redux integration demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <ReduxIntegrationDemo />
      </MuiThemeProvider>,
    );
  });
});
