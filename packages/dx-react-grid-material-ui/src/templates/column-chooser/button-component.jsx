import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export class ButtonComponent extends React.PureComponent {
  render() {
    const { onButtonClick, ...restProps } = this.props;
    return (
      <Tooltip
        title="Hidden columns" //TODO add custom messages
        placement="bottom-end"
        enterDelay={300}
        {...restProps}
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
