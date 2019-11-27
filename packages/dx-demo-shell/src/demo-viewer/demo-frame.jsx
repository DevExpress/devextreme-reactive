/* eslint-disable max-classes-per-file */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import {
  FormGroup, ControlLabel, FormControl, InputGroup, Button,
} from 'reactstrap';
import { DemoRenderer } from './demo-renderer';
import { EmbeddedDemoContext } from '../context';

const Link = ({ link }) => (
  <link rel="stylesheet" href={link} />
);

Link.propTypes = {
  link: PropTypes.string,
};
Link.defaultProps = {
  link: '',
};

class DemoFrameRenderer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    const {
      themeSources,
    } = this.context;
    const {
      themeName,
      variantName,
    } = props;

    const themeVariantOptions = themeSources
      .find(theme => theme.name === themeName).variants
      .find(variant => variant.name === variantName);

    this.state = {
      editableLink: themeVariantOptions.editableLink,
      frameHeight: 600,
    };
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.updateFrameHeight();
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
    const { markup } = this.props;
    const { frame } = this.context;
    const { editableLink, frameHeight } = this.state;

    return (
      <div>
        {!frame && !!editableLink ? (
          <form
            style={{ marginBottom: '20px' }}
          >
            <FormGroup controlId="customThemeLink">
              <ControlLabel>
                Custom theme link
              </ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  id="customLink"
                  innerRef={(node) => { this.customThemeLinkNode = node; }}
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
            <DemoRenderer {...this.props} />
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
                head={<Link link={editableLink} />}
                initialContent={markup}
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
