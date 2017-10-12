import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import RemoteDataDemo from './demo';

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve());
  });

  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <RemoteDataDemo />
      </MuiThemeProvider>,
    );
  });
});
