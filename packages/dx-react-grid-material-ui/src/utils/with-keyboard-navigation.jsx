import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cell: {
      '&:focus-visible': {
        border: '1px solid blue',
        outline: "none",
      },
    },
  });

export const withKeyboardNavigation = (key1, key2, notCell) => (Component) => {
  class ComponentForNavigation extends React.PureComponent {
      constructor(props) {
        super(props);
        this.ref = React.createRef();
      }

      componentDidMount() {
        const { setRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
        if(setRefForKeyboardNavigation) {
            setRefForKeyboardNavigation(this.ref, key1 || tableRow.key, key2 || tableColumn.key);
        }
      }

    render() {
      const { setRefForKeyboardNavigation, ...restProps } = this.props;
      return <Component refComponent={this.ref} {...restProps} />;
    }
  }
  return !notCell ? withStyles(styles)(ComponentForNavigation) : ComponentForNavigation;
};
