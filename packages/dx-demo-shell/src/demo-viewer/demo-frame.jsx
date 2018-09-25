import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import {
  Form, Button, FormGroup, InputGroup, InputGroupAddon, Input, Label,
} from 'reactstrap';
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
        ${themeLinks}
        ${link !== undefined ? `<link rel="stylesheet" href="${link}">` : ''}
        <style>
          body { margin: 8px; overflow: hidden; }
          .panel { margin: 0; }
        </style>
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
    const { editableLink } = this.state;
    if (editableLink !== prevState.editableLink) {
      if (this.node) this.node.ownerDocument.location.reload();
    }
  }

  updateFrameHeight() {
    const { frameHeight } = this.state;
    setTimeout(this.updateFrameHeight.bind(this));
    if (!this.node) return;
    const height = this.node.ownerDocument.documentElement.offsetHeight;
    if (height !== frameHeight) {
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
          <Form
            style={{ marginBottom: '20px' }}
          >
            <FormGroup>
              <Label for="customLink">Custom theme link</Label>
              <InputGroup>
                <Input
                  type="text"
                  id="customLink"
                  innerRef={(node) => { this.customThemeLinkNode = node; }}
                  defaultValue={editableLink}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="secondary"
                    onClick={() => {
                      this.setState({ editableLink: this.customThemeLinkNode.value });
                    }}
                  >
                    Apply
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Form>
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
                  minWidth: '100%',
                  width: '100px',
                  height: `${frameHeight}px`,
                  marginBottom: '20px',
                }}
                initialContent={this.markup(editableLink)}
                mountTarget="#mountPoint"
                scrolling="no"
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
