import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingCustom from './local-grouping-custom';

describe('MUI: grouping with custom', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingCustom />
      </MuiThemeProvider>,
    );
  });
});
