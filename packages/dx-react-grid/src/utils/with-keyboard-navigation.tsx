import * as React from 'react';
import { NavigatedComponent } from '../types';

export const withKeyboardNavigation = (key1?: string, key2?: string) => 
<T extends NavigatedComponent>(Component: React.ComponentType<T>): React.ComponentType<T> => {
  class ComponentWithNavigation extends React.PureComponent<T> {
    ref: React.RefObject<T>
    constructor(props) {
      super(props);
      this.ref = React.createRef();
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if(updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation(this.ref, key1 || tableRow.key, key2 || tableColumn.key, 'add');
      }
      if(this.ref.current) {
        (this.ref.current as any).addEventListener('mouseup', this.handleClick);
      }
    }

    componentWillUnmount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if(updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation(this.ref, key1 || tableRow.key, key2 || tableColumn.key, 'remove');
      }
      if(this.ref.current) {
        (this.ref.current as any).removeEventListener('mouseup', this.handleClick);
      }
    }

    handleClick() {
      const { tableRow, tableColumn, setFocusedElement } = this.props;
      setFocusedElement && setFocusedElement(key1 || tableRow.key, key2 || tableColumn.key);
    }

    render() {
      return <Component refObject={this.ref} {...this.props} />;
    }
  }
  return ComponentWithNavigation;
};
