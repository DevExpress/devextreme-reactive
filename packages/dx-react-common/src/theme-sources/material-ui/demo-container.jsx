import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const DemoContainer = ({ theme, children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

DemoContainer.propTypes = {
  theme: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default props => <DemoContainer {...props} theme={lightTheme} />;
export const Dark = props => <DemoContainer {...props} theme={darkTheme} />;
