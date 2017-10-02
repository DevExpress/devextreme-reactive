import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomFilteringAlgorithmDemo from './custom-filtering-algorithm';

describe('MUI: custom filtering algorithm demo', () => {
  configure({ adapter: new Adapter() });
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomFilteringAlgorithmDemo />
      </MuiThemeProvider>,
    );
  });
});
