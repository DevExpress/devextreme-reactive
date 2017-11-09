import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { Nav, NavItem, FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';

const THEMES = [{
  name: 'Journal',
  link: 'https://bootswatch.com/3/journal/bootstrap.min.css',
}, {
  name: 'Darkly',
  link: 'https://bootswatch.com/3/darkly/bootstrap.min.css',
}, {
  name: 'United',
  link: 'https://bootswatch.com/3/united/bootstrap.min.css',
}, {
  name: 'Custom',
}];
const CUSTOM_THEME = 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css';

export default class DemoFrame extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      themes: THEMES,
      currentTheme: THEMES[0].name,
      customThemeLink: CUSTOM_THEME,
      frameHeight: 600,
    };

    const { scriptPath } = this.context.embeddedDemoOptions;
    this.markup = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>.panel { margin: 0 !important; }</style>
      </head>
      <body>
      <div id="mountPoint"></div>
      <div class="embedded-demo" data-options='{ "path": "/demo/featured-theming/_embedded-demo/bootstrap3/clean" }'>Loading...</div>
      <script src="${scriptPath}"></script>
      </body>
      </html>`;
  }
  componentDidMount() {
    this.updateFrameHeight();
  }
  updateFrameHeight() {
    setTimeout(this.updateFrameHeight.bind(this));

    if (!this.node) return;
    const { height } = this.node.ownerDocument.body.getBoundingClientRect();
    if (height !== this.state.frameHeight) {
      this.setState({ frameHeight: height });
    }
  }
  render() {
    const {
      themes, currentTheme, customThemeLink, frameHeight,
    } = this.state;

    return (
      <div>
        <Nav
          bsStyle="tabs"
          activeKey={currentTheme}
          onSelect={theme => this.setState({ currentTheme: theme })}
          style={{ marginBottom: '20px' }}
        >
          {themes.map(theme => (
            <NavItem
              key={theme.name}
              eventKey={theme.name}
              title={theme.name}
            >
              {theme.name}
            </NavItem>
          ))}
        </Nav>

        {currentTheme === 'Custom' && (
          <form
            style={{ marginBottom: '20px' }}
          >
            <FormGroup controlId="customThemeLink">
              <ControlLabel>Custom theme link</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  inputRef={(node) => { this.customThemeLinkNode = node; }}
                  defaultValue={customThemeLink}
                />
                <InputGroup.Button>
                  <Button
                    onClick={() =>
                      this.setState({ customThemeLink: this.customThemeLinkNode.value })
                    }
                  >
                    Apply
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        )}

        <Frame
          style={{
            border: 'none',
            width: '100%',
            height: `${frameHeight}px`,
            marginBottom: '20px',
          }}
          initialContent={this.markup}
          mountTarget="#mountPoint"
        >
          <link
            rel="stylesheet"
            href={themes.find(theme => theme.name === currentTheme).link || customThemeLink}
          />
          <div ref={(node) => { this.node = node; }} />
        </Frame>
      </div>
    );
  }
}

DemoFrame.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
