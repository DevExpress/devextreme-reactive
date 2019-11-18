/* eslint-disable max-classes-per-file */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import {
  FormGroup, ControlLabel, FormControl, InputGroup, Button,
} from 'react-bootstrap';
import { DemoRenderer } from './demo-renderer';
import { EmbeddedDemoContext } from '../context';

class DemoFrameRenderer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editableLink: this.getThemeVariantOptions().editableLink,
      frameHeight: 600,
    };
    this.nodeRef = React.createRef();

    this.onSubmitCustomLink = (e) => {
      e.preventDefault();
      this.setState({ editableLink: this.customThemeLinkNode.value });
    };
  }

  componentDidMount() {
    this.updateFrameHeight();
  }

  getThemeVariantOptions() {
    const {
      themeName,
      variantName,
    } = this.props;
    const { themeSources } = this.context;

    return themeSources
      .find(theme => theme.name === themeName).variants
      .find(variant => variant.name === variantName);
  }

  getMarkup() {
    const {
      sectionName,
      demoName,
      themeName,
      variantName,
      perfSamplesCount,
    } = this.props;
    const {
      scriptPath, firstPart, lastPart, demoSources,
    } = this.context;

    let demoScript = scriptPath;
    if (firstPart !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      const productName = demoSources[sectionName][demoName][themeName].productName;
      demoScript = `${firstPart}${productName}${lastPart}`;
    }

    const frameUrl = `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`;
    const themeLinks = this.getThemeLinks();

    const mode = perfSamplesCount > 0 ? `/perf/${perfSamplesCount}` : '/clean';
    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${themeLinks}
        <style>
          body { margin: 8px; overflow: hidden; }
          .panel { margin: 0; }
        </style>
      </head>
      <body>
        <div id="mountPoint"></div>
        <div class="embedded-demo" data-options='{ "path": "${frameUrl}${mode}", "frame": true }'>
          <div style="min-height: 500px;">Loading...</div>
        </div>
        <script src="${demoScript}"></script>
      </body>
      </html>`;
  }

  getThemeLinks() {
    const { editableLink } = this.state;
    const themeVariantOptions = this.getThemeVariantOptions();
    const links = [
      ...(themeVariantOptions.links || []),
      (editableLink ? [editableLink] : []),
    ];
    return links.length
      ? links.map(link => `<link rel="stylesheet" href="${link}">`).join('\n')
      : '';
  }

  updateFrameHeight() {
    const { frameHeight } = this.state;
    const node = this.nodeRef.current;
    setTimeout(this.updateFrameHeight.bind(this));

    if (!node) return;

    const height = node.ownerDocument.documentElement.offsetHeight;
    if (height !== frameHeight) {
      this.setState({ frameHeight: height });
    }
  }

  render() {
    const { frame } = this.context;
    const { editableLink, frameHeight } = this.state;

    return (
      <div>
        {!frame && !!editableLink ? (
          <form
            style={{ marginBottom: '20px' }}
            onSubmit={this.onSubmitCustomLink}
          >
            <FormGroup controlId="customThemeLink">
              <ControlLabel>
                Custom theme link
              </ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  inputRef={(node) => { this.customThemeLinkNode = node; }}
                  defaultValue={editableLink}
                />
                <InputGroup.Button>
                  <Button type="submit">
                    Apply
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        ) : null}

        {frame
          ? (
            <DemoRenderer {...this.props} />
          )
          : (
            <div
              style={{
                margin: '-8px',
              }}
            >
              <Frame
                key={editableLink} // NOTE: re-render frame once theme link has changed
                style={{
                  border: 'none',
                  minWidth: '100%',
                  width: '100px',
                  height: `${frameHeight}px`,
                  marginBottom: '20px',
                }}
                initialContent={this.getMarkup()}
                mountTarget="#mountPoint"
                scrolling="no"
              >
                <div ref={this.nodeRef} />
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
  perfSamplesCount: PropTypes.number,
};

DemoFrameRenderer.defaultProps = {
  perfSamplesCount: undefined,
};

DemoFrameRenderer.contextType = EmbeddedDemoContext;

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
