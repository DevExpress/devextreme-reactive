import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export const mountWithStyles = children =>
  mount(
    <MuiThemeProvider theme={createMuiTheme()}>
      {children}
    </MuiThemeProvider>,
  );

