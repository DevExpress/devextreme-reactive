/* eslint-disable max-classes-per-file */
import * as React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import {
  FormGroup, Label, Input, InputGroup, Button,
} from 'reactstrap';
import { DemoRenderer } from './demo-renderer';
import { EmbeddedDemoContext } from '../context';

class DemoFrameRenderer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      frameHeight: 600,
    };
    this.nodeRef = React.createRef();

    this.onSubmitCustomLink = (e) => {
      e.preventDefault();
      const { onEditableLinkChange } = this.props;
      onEditableLinkChange(this.customThemeLinkNode.value);
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
    const { markup, editableLink } = this.props;
    const { frame } = this.context;
    const { frameHeight } = this.state;

    return (
      <div>
        {!frame && !!editableLink ? (
          <form
            style={{ marginBottom: '20px' }}
            onSubmit={this.onSubmitCustomLink}
          >
            <FormGroup controlId="customThemeLink">
              <Label>
                Custom theme link
              </Label>
              <InputGroup>
                <Input
                  type="text"
                  id="customLink"
                  innerRef={(node) => { this.customThemeLinkNode = node; }}
                  defaultValue={editableLink}
                />
                <Button type="submit">
                  Apply
                </Button>
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
  markup: PropTypes.string.isRequired,
  editableLink: PropTypes.string.isRequired,
  onEditableLinkChange: PropTypes.func.isRequired,
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
