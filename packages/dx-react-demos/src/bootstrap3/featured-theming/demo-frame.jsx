import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class DemoFrame extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      themes: [{
        name: 'default',
        link: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
      }, {
        name: 'journal',
        link: 'https://bootswatch.com/journal/bootstrap.min.css',
      }, {
        name: 'darkly',
        link: 'https://bootswatch.com/darkly/bootstrap.min.css',
      }],
      currentTheme: 'journal',
      frameHeight: 600,
    };

    this.updateFrameHeight();
  }
  updateFrameHeight() {
    setTimeout(this.updateFrameHeight.bind(this));

    if (!this.node) return;
    const height = this.node.ownerDocument.body.getBoundingClientRect().height;
    if (height !== this.state.frameHeight) {
      this.setState({ frameHeight: height });
    }
  }
  render() {
    const { themes, currentTheme, frameHeight } = this.state;
    const { scriptPath } = this.context.embeddedDemoOptions;
    const markup = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>.panel { margin: 0 !important; }</style>
      </head>
      <body>
      <div id="mountPoint"></div>
      <div class="embedded-demo" data-options='{ "path": "/demo/featured-theming/_embedded-demo/clear/bootstrap3" }'>Loading...</div>
      <script src="${scriptPath}"></script>
      </body>
      </html>`;

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <Form inline>
            <FormGroup>
              <ControlLabel>Theme</ControlLabel>
              {' '}
              <FormControl
                componentClass="select"
                placeholder="select"
                value={currentTheme}
                onChange={e => this.setState({ currentTheme: e.target.value })}
              >
                {themes.map(theme => (
                  <option key={theme.name} value={theme.name}>{theme.name}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Form>
        </div>

        <Frame
          style={{
            border: 'none',
            borderRadius: '5px',
            width: '100%',
            height: `${frameHeight}px`,
            marginBottom: '20px',
          }}
          initialContent={markup}
          mountTarget="#mountPoint"
        >
          <link rel="stylesheet" href={themes.find(theme => theme.name === currentTheme).link} />
          <div
            ref={(node) => { this.node = node; }}
          />
        </Frame>
      </div>
    );
  }
}

DemoFrame.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
