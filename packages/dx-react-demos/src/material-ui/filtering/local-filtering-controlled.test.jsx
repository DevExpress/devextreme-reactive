import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalFilteringControlledDemo from './local-filtering-controlled';

describe('MUI: local filtering controlled demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalFilteringControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
