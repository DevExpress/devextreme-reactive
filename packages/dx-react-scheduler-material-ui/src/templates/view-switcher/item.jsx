import * as React from 'react';
import * as PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const Item = ({
  onItemClick,
  viewName,
  onHide,
  ...restProps
}) => (
  <ListItem
    button
    onClick={() => { onItemClick({ nextView: viewName }); onHide(); }}
    {...restProps}
  >
    <ListItemText primary={viewName} />
  </ListItem>
);

Item.propTypes = {
  onItemClick: PropTypes.func,
  onHide: PropTypes.func,
  viewName: PropTypes.string,
};

Item.defaultProps = {
  onItemClick: () => undefined,
  onHide: () => undefined,
  viewName: undefined,
};
