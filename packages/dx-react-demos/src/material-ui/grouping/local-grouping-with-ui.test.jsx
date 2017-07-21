import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import LocalGroupingWithUI from './local-grouping-with-ui';

describe('MUI: grouping by drag\'n\'drop', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingWithUI />
      </MuiThemeProvider>,
    );
  });
});
