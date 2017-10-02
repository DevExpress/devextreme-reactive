import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomDataAccessorsInColumns from './custom-data-accessors-in-columns';

describe('MUI: custom data accessors in columns demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomDataAccessorsInColumns />
      </MuiThemeProvider>,
    );
  });
});
