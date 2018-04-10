import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Label extends React.Component {
  render() {
    const {
      text, x, y, alignmentBaseline, textAnchor, refsHandler,
    } = this.props;
    return (
      <text
        ref={refsHandler}
        dominantBaseline={alignmentBaseline}
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
  alignmentBaseline: PropTypes.string.isRequired,
  textAnchor: PropTypes.string.isRequired,
  refsHandler: PropTypes.func.isRequired,
};
