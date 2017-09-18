import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomLocalFilteringDemo from './custom-local-filtering';

describe('MUI: custom local filtering demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomLocalFilteringDemo />
      </MuiThemeProvider>,
    );
  });
});
