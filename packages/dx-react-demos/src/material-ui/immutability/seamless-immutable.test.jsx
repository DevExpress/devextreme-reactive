import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import SeamlessImmutableDemo from './seamless-immutable';

describe('MUI: seamless-immutable demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <SeamlessImmutableDemo />
      </MuiThemeProvider>,
    );
  });
});
