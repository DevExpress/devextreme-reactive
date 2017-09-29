import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CustomFilteringAlgorithmDemo from './custom-filtering-algorithm';

describe('MUI: custom filtering algorithm demo', () => {
  it('should work', () => {
    mount(
      <MuiThemeProvider theme={createMuiTheme()}>
        <CustomFilteringAlgorithmDemo />
      </MuiThemeProvider>,
    );
  });
});
