import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import RemoteDataDemo from './demo';

injectTapEventPlugin();

describe('BS3 featured: remote data demo', () => {
  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve());
  });
  configure({ adapter: new Adapter() });

  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <RemoteDataDemo />
      </MuiThemeProvider>,
    );
  });
});
