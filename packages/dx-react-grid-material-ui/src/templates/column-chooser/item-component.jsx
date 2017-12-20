import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export class ItemComponent extends React.PureComponent {
  render() {
    const {
      item: { column, hidden },
      onToggle: handleClick,
      ...restProps
    } = this.props;
    return (
      <ListItem
        key={column.name}
        button
        onClick={handleClick}
        {...restProps}
      >
        <Checkbox
          checked={!hidden}
          tabIndex={-1}
          disableRipple
          style={{ width: 'auto', height: 'auto' }}
        />
        <ListItemText primary={column.title || column.name} />
      </ListItem>
    );
  }
}

ItemComponent.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func,
};

ItemComponent.defaultProps = {
  onToggle: () => { },
};
