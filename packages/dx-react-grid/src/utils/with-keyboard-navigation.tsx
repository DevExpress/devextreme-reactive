import * as React from 'react';
import { NavigatedComponent } from '../types';

export const withKeyboardNavigation = (key1?: string, key2?: string) => 
<T extends NavigatedComponent>(Component: React.ComponentType<T>): React.ComponentType<T> => {
  class ComponentWithNavigation extends React.PureComponent<T> {
    ref: React.RefObject<T>
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
        debugger
      return <Component refObject={this.ref} {...this.props} />;
    }
  }
  return ComponentWithNavigation;
};
