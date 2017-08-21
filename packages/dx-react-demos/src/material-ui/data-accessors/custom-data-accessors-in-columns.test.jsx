import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomDataAccessorsInColumns from './custom-data-accessors-in-columns';

describe('MUI: custom data accessors in columns demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomDataAccessorsInColumns />
      </MuiThemeProvider>,
    );
  });
});
