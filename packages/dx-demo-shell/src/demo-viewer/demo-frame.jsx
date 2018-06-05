import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import { DemoRenderer } from './demo-renderer';

class DemoFrameRenderer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    const {
      sectionName,
      demoName,
      themeName,
      variantName,
    } = props;
    const { embeddedDemoOptions: { scriptPath, themeSources } } = this.context;
    const themeVariantOptions = themeSources
      .find(theme => theme.name === themeName).variants
      .find(variant => variant.name === variantName);
    const frameUrl = `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`;
    const themeLinks = themeVariantOptions.links
      ? themeVariantOptions.links.map(link => `<link rel="stylesheet" href="${link}">`).join('\n')
      : '';
    this.markup = link => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 8px; overflow: hidden; }
          .panel { margin: 0 !important; }
        </style>
        ${themeLinks}
        ${link !== undefined ? `<link rel="stylesheet" href="${link}">` : ''}
      </head>
      <body>
        <div id="mountPoint"></div>
        <div class="embedded-demo" data-options='{ "path": "${frameUrl}/clean", "frame": true }'>
          <div style="min-height: 500px;">Loading...</div>
        </div>
        <script src="${scriptPath}"></script>
      </body>
      </html>`;
    this.state = {
      editableLink: themeVariantOptions.editableLink,
      frameHeight: 600,
    };
  }
  componentDidMount() {
    this.updateFrameHeight();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editableLink !== prevState.editableLink) {
      if (this.node) this.node.ownerDocument.location.reload();
    }
  }
  updateFrameHeight() {
    setTimeout(this.updateFrameHeight.bind(this));
    if (!this.node) return;
    const height = this.node.ownerDocument.documentElement.offsetHeight;
    if (height !== this.state.frameHeight) {
      this.setState({ frameHeight: height });
    }
  }
  render() {
    const {
      sectionName,
      demoName,
      themeName,
      variantName,
    } = this.props;
    const { embeddedDemoOptions: { frame } } = this.context;
    const { editableLink, frameHeight } = this.state;

    return (
      <div>
        {!frame && !!editableLink ? (
          <form
            style={{ marginBottom: '20px' }}
          >
            <FormGroup controlId="customThemeLink">
              <ControlLabel>Custom theme link</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  inputRef={(node) => { this.customThemeLinkNode = node; }}
                  defaultValue={editableLink}
                />
                <InputGroup.Button>
                  <Button
                    onClick={() => {
                      this.setState({ editableLink: this.customThemeLinkNode.value });
                    }}
                  >
                    Apply
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        ) : null}

        {frame
          ? (
            <DemoRenderer
              sectionName={sectionName}
              demoName={demoName}
              themeName={themeName}
              variantName={variantName}
            />
          )
          : (
            <div
              style={{
                margin: '-8px',
              }}
            >
              <Frame
                style={{
                  border: 'none',
                  width: '100%',
                  height: `${frameHeight}px`,
                  marginBottom: '20px',
                }}
                initialContent={this.markup(editableLink)}
                mountTarget="#mountPoint"
              >
                <div ref={(node) => { this.node = node; }} />
              </Frame>
            </div>
          )}
      </div>
    );
  }
}

DemoFrameRenderer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  variantName: PropTypes.string.isRequired,
};

DemoFrameRenderer.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};

// eslint-disable-next-line react/no-multi-comp
export class DemoFrame extends React.PureComponent {
  render() {
    const Rerenderer = ({ children }) => children;
    return (
      <Rerenderer>
        <DemoFrameRenderer {...this.props} />
      </Rerenderer>
    );
  }
}
