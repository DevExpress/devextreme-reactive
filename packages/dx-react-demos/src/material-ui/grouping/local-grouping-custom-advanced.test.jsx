import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingCustomAdvanced from './local-grouping-custom-advanced';

describe('MUI: grouping with custom advanced', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingCustomAdvanced />
      </MuiThemeProvider>,
    );
  });
});
