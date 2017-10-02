import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingWithUI from './local-grouping-with-ui';

describe('MUI: grouping by drag\'n\'drop', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingWithUI />
      </MuiThemeProvider>,
    );
  });
});
