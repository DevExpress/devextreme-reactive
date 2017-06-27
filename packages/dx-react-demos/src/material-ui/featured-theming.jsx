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
        This demo demonstrates how the Grid looks within different Material UI themes.
        You can switch between the Light and Dark themes and check the appearance.
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
