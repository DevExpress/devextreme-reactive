import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { ThemingDemo } from './featured/theming';

export class FeaturedThemingDemos extends React.PureComponent {
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
    const currentTheme = this.state.currentTheme;
    return (<div>
      <h1>Grid Theming</h1>
      <p>
        This demo illustrates the grid&apos;s Light and Dark <a href="https://material-ui-1dab0.firebaseapp.com/customization/themes">Material UI theme</a> appearance.
        The <a href="https://material-ui-1dab0.firebaseapp.com/component-api/mui-theme-provider">MuiThemeProvider&apos;s</a> &quot;theme&quot; property component specifies the current theme.
        See the <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/material-ui/featured/theming.jsx">source code</a> for more details.
      </p>

      <Nav
        bsStyle="tabs"
        activeKey={currentTheme}
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
