import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';

const BOOTSTRAP4_THEME = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
const ICONS = 'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css';

export default class DemoContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      frameHeight: 600,
    };

    const { url } = this.props;
    const { scriptPath } = this.context.embeddedDemoOptions;
    this.markup = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="${BOOTSTRAP4_THEME}" />
        <link rel="stylesheet" href="${ICONS}" />
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
    const { children } = this.props;
    const { embeddedDemoOptions: { frame } } = this.context;
    const { frameHeight } = this.state;

    return (
      <div>
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
              <div ref={(node) => { this.node = node; }} />
            </Frame>
        )}
      </div>
    );
  }
}

DemoContainer.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

DemoContainer.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
