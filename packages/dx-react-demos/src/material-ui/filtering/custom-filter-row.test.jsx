import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { CustomFilterRowDemo } from './custom-filter-row';

describe('MUI: custom filter row demo', () => {
  test('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomFilterRowDemo />
      </MuiThemeProvider>,
    );

    expect(true).toBeTruthy();
  });
});
