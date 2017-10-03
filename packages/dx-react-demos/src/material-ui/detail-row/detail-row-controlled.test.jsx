import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import DetailRowControlledDemo from './detail-row-controlled';

describe('MUI: detail row controlled demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <DetailRowControlledDemo />
      </MuiThemeProvider>,
    );
  });
});
