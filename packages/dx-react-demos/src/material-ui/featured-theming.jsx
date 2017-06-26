import React from 'react';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { Nav, NavItem } from 'react-bootstrap';
import { ThemingDemo } from './featured/theming';

const createTheme = themeKey => createMuiTheme({
  palette: createPalette({
    type: themeKey,
  }),
});

export class FeaturedThemingDemos extends React.PureComponent {
  constructor(props) {
    super(props);
    const currentThemeKey = 'light';

    this.state = {
      currentThemeKey,
      currentTheme: createTheme(currentThemeKey),
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(themeKey) {
    this.setState({ currentTheme: createTheme(themeKey), currentThemeKey: themeKey });
  }

  render() {
    const { currentTheme, currentThemeKey } = this.state;
    return (<div>
      <h1>Grid Theming</h1>
      <p>
        Description...
      </p>

      <Nav
        bsStyle="tabs"
        activeKey={currentThemeKey}
        onSelect={this.changeTheme}
        style={{ marginBottom: '20px' }}
      >
        <NavItem eventKey="light" title="Light">Light</NavItem>
        <NavItem eventKey="dark" title="Dark">Dark</NavItem>
      </Nav>

      <ThemingDemo
        theme={currentTheme}
      />

      <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/material-ui/featured/theming.jsx">
        SOURCE CODE
      </a>
    </div>);
  }
}
