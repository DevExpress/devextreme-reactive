import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import SimpleDetailRowDemo from './simple-detail-row';

describe('MUI: simple detail row demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <SimpleDetailRowDemo />
      </MuiThemeProvider>,
    );
  });
});
