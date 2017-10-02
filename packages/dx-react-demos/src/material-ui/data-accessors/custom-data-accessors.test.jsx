import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomDataAccessors from './custom-data-accessors';

describe('MUI: custom data accessors demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomDataAccessors />
      </MuiThemeProvider>,
    );
  });
});
