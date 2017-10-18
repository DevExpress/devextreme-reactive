import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import Demo from './demo';

const createTheme = theme => createMuiTheme({
  palette: {
    type: theme,
    primary: blue,
  },
});

export default class DemoFrame extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: 'light',
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(theme) {
    this.setState({ currentTheme: theme });
  }

  render() {
    const { currentTheme } = this.state;

    // Forces demo rerendering on theme change
    const ThemedDemo = () => <Demo />;

    return (
      <div>
        <Nav
          bsStyle="tabs"
          activeKey={currentTheme}
          onSelect={this.changeTheme}
          style={{ marginBottom: '20px' }}
        >
          <NavItem eventKey="light" title="Light">Light</NavItem>
          <NavItem eventKey="dark" title="Dark">Dark</NavItem>
        </Nav>

        <MuiThemeProvider theme={createTheme(currentTheme)}>
          <ThemedDemo />
        </MuiThemeProvider>
      </div>
    );
  }
}
