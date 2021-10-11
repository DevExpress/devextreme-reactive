import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const lightTheme = createTheme(adaptV4Theme({
  palette: {
    mode: 'light',
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
}));

const darkTheme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
}));

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
