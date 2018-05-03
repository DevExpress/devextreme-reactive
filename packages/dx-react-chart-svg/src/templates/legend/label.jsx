import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Label extends React.PureComponent {
  render() {
    const {
      text, x, y, dominantBaseline, textAnchor, refsHandler,
    } = this.props;
    return (
      <text
        ref={refsHandler}
        dominantBaseline={dominantBaseline}
        textAnchor={textAnchor}
        key={text}
        x={x}
        y={y}
      >
        {text}
      </text>
    );
  }
}

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dominantBaseline: PropTypes.string.isRequired,
  textAnchor: PropTypes.string.isRequired,
  refsHandler: PropTypes.func.isRequired,
};
