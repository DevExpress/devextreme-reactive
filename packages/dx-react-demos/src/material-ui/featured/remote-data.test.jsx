import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { RemoteDataDemo } from './remote-data';

injectTapEventPlugin();

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
  });

  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <RemoteDataDemo />
      </MuiThemeProvider>,
    );
  });
});
