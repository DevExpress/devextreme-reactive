import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider, StyledEngineProvider, createTheme,
} from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
  },
});

const DemoContainer = ({ theme, children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

DemoContainer.propTypes = {
  theme: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default props => <DemoContainer {...props} theme={lightTheme} />;
export const Dark = props => <DemoContainer {...props} theme={darkTheme} />;
