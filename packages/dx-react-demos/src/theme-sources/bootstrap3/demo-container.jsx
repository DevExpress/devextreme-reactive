import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';

const DemoContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

DemoContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContainer;

const THEMES = [{
  name: 'darkly',
  link: 'https://bootswatch.com/3/darkly/bootstrap.min.css',
}];
const CUSTOM_THEME = 'https://bootswatch.com/3/united/bootstrap.min.css';

class DemoFrame extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      customThemeLink: CUSTOM_THEME,
      frameHeight: 600,
    };

    const { themeName, url } = this.props;
    const { scriptPath } = this.context.embeddedDemoOptions;
    const themeLink = themeName !== 'custom' && THEMES.find(({ name }) => name === themeName).link;
    this.markup = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="${themeLink}">
        <style>
          .panel { margin: 0 !important; }
        </style>
      </head>
      <body>
      <div id="mountPoint"></div>
      <div class="embedded-demo" data-options='{ "path": "${url}/clean", "frame": true }'>
        <div style="min-height: 500px;">Loading...</div>
      </div>
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
    const { themeName, children } = this.props;
    const { embeddedDemoOptions: { frame } } = this.context;
    const { customThemeLink, frameHeight } = this.state;

    return (
      <div>
        {!frame && themeName === 'custom' && (
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

        {frame
          ? children
          : (
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
              {themeName === 'custom' ? (
                <link rel="stylesheet" href={customThemeLink} />
              ) : null}
              <div ref={(node) => { this.node = node; }} />
            </Frame>
        )}
      </div>
    );
  }
}

DemoFrame.propTypes = {
  themeName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

DemoFrame.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};

export const Darkly = props => <DemoFrame {...props} themeName="darkly" />;
export const Custom = props => <DemoFrame {...props} themeName="custom" />;
