import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';

export class Pane extends React.PureComponent {
  componentDidMount() {
    const { width, height, changeBBox } = this.props;
    changeBBox({ placeholder: 'pane', bBox: { width, height } });
  }

  componentDidUpdate({ width: prevWidth, height: prevHeight, changeBBox }) {
    const { width, height } = this.props;
    if (prevWidth !== width || prevHeight !== height) {
      changeBBox({ placeholder: 'pane', bBox: { width, height } });
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <svg
          width={width}
          height={height}
          style={{
            position: 'absolute', left: 0, top: 0, overflow: 'visible',
          }}
        >
          <TemplatePlaceholder name="series" />
        </svg>
      </div>
    );
  }
}

Pane.propTypes = {
  changeBBox: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
