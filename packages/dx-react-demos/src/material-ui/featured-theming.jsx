import React from 'react';

import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import { FormControl } from 'react-bootstrap';

import { ThemingDemo } from './featured/theming';

const createTheme = theme => createMuiTheme({
  palette: createPalette({
    type: theme,
  }),
});

export class FeaturedThemingDemos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: createTheme('light'),
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(evt) {
    this.setState({ theme: createTheme(evt.target.value) });
  }

  render() {
    return (<div>
      <h1>Grid Theming</h1>
      <p>
        Description...
      </p>

      <FormControl
        componentClass="select"
        placeholder="Choose theme"
        onChange={this.changeTheme}
        style={{ marginBottom: '20px' }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </FormControl>

      <ThemingDemo
        theme={this.state.theme}
      />

      <a href="https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-demos/src/material-ui/featured/theming.jsx">
        SOURCE CODE
      </a>
    </div>);
  }
}
