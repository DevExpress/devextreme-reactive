import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemText } from 'material-ui/List';

export class Label extends React.PureComponent {
  render() {
    const {
      text, ...restProps
    } = this.props;
    return (
      <ListItemText {...restProps}>{text}</ListItemText>
    );
  }
}

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
