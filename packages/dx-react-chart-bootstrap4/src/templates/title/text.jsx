import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Text extends React.PureComponent {
  render() {
    const { text, ...restProps } = this.props;
    return (
      <h3 {...restProps}>
        {text}
      </h3>
    );
  }
}

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
