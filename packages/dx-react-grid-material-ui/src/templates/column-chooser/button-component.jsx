import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

export class ButtonComponent extends React.PureComponent {
  render() {
    const { onButtonClick, refFunc } = this.props;
    return (
      <Tooltip
        title="Hidden columns"
        placement="bottom-end"
        enterDelay={300}
      >
        <IconButton
          ref={refFunc}
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
  refFunc: PropTypes.func.isRequired,
};
