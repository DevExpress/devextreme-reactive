import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
  },
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
