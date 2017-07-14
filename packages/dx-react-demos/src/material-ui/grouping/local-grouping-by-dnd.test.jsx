import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { LocalGroupingByDndDemo } from './local-grouping-by-dnd';

describe('MUI: grouping by drag\'n\'drop', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <LocalGroupingByDndDemo />
      </MuiThemeProvider>,
    );
  });
});
