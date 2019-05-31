import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

DemoContainer.propTypes = {
  theme: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default props => <DemoContainer {...props} theme={lightTheme} />;
export const Dark = props => <DemoContainer {...props} theme={darkTheme} />;
