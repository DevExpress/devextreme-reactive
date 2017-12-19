import React from 'react';
import PropTypes from 'prop-types';

export class ButtonComponent extends React.PureComponent {
  render() {
    const { onButtonClick, refFunc } = this.props;
    return (
      <button
        className="btn btn-link"
        onClick={onButtonClick}
      >
        <i className="glyphicon glyphicon-eye-close" />
      </button>
    );
  }
}

ButtonComponent.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  refFunc: PropTypes.func.isRequired,
};
