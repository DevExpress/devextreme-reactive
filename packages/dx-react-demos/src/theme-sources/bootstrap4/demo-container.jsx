import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const CUSTOM_THEME = 'https://bootswatch.com/4/sketchy/bootstrap.min.css';
const ICONS = 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css';
const THEMES = [{
  name: 'default',
  link: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
}, {
  name: 'cyborg',
  link: 'https://bootswatch.com/4/cyborg/bootstrap.min.css',
}];

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
        <link rel="stylesheet" href="${themeLink}" />
        <link rel="stylesheet" href="${ICONS}" />
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

export default props => <DemoFrame {...props} themeName="default" />;
export const Cyborg = props => <DemoFrame {...props} themeName="cyborg" />;
export const Custom = props => <DemoFrame {...props} themeName="custom" />;
