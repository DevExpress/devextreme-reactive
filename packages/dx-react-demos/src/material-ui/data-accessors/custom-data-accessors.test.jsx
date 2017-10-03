import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomDataAccessors from './custom-data-accessors';

describe('MUI: custom data accessors demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomDataAccessors />
      </MuiThemeProvider>,
    );
  });
});
