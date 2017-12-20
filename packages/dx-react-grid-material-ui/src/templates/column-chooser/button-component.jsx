import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export class ButtonComponent extends React.PureComponent {
  render() {
    const { onButtonClick } = this.props;
    return (
      <Tooltip
        title="Hidden columns"
        placement="bottom-end"
        enterDelay={300}
      >
        <IconButton
          onClick={onButtonClick}
        >
          <VisibilityOff />
        </IconButton>
      </Tooltip>
    );
  }
}

ButtonComponent.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
