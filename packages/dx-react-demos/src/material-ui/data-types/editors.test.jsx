import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Demo from './editors';

describe('MUI: custom editors demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <Demo />
      </MuiThemeProvider>,
    );
  });
});
