import React from 'react';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue } from 'material-ui/colors';

injectTapEventPlugin();

const theme = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: blue,
  }),
});

const DemoContainer = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

DemoContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContainer;
