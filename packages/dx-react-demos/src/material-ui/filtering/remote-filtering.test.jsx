import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Demo from './remote-filtering';

describe('MUI filtering: remote filtering', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <Demo />
      </MuiThemeProvider>,
    );
  });
});
