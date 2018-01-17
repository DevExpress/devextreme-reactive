import React from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';

const DEFAULT_THEME = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css';

export default class DemoContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      defaultThemeLink: DEFAULT_THEME,
      frameHeight: 600,
    };

    const { url } = this.props;
    const { scriptPath } = this.context.embeddedDemoOptions;
    this.markup = `
      <!DOCTYPE html>
      <html>
      <head>
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
    const { defaultThemeLink, frameHeight } = this.state;

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
              <link
                rel="stylesheet"
                href={defaultThemeLink}
              />
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
