import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Label extends React.PureComponent {
  render() {
    const {
      text, margin,
    } = this.props;
    return (
      <span style={{ margin }} >{text}</span>
    );
  }
}

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  margin: PropTypes.number.isRequired,
};
