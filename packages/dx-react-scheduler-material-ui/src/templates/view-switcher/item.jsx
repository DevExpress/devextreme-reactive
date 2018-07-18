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
    onClick={() => { debugger; onItemClick({ nextView: viewName }); onHide(); console.log(viewName); }}
    {...restProps}
  >
    <ListItemText primary={viewName} />
  </ListItem>
);

Item.propTypes = {
  onItemClick: PropTypes.func,
  viewName: PropTypes.string,
};

Item.defaultProps = {
  onItemClick: () => undefined,
  viewName: undefined,
};
