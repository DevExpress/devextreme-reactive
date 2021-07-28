import * as React from 'react';
import { NavigatedComponent } from '../types';

export const withKeyboardNavigation = (key1?: string, key2?: string) =>
<T extends NavigatedComponent>(Component: React.ComponentType<T>): React.ComponentType<T> => {
  class ComponentWithNavigation extends React.PureComponent<T> {
    ref: React.RefObject<T>;
    constructor(props) {
      super(props);
      this.ref = React.createRef();
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if (updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation({
          ref: this.ref,
          key1: key1 || tableRow.key,
          key2: key2 || tableColumn.key,
          action: 'add',
        });
      }
      if (this.ref.current) {
        (this.ref.current as any).addEventListener('mouseup', this.handleClick);
      }
    }

    componentWillUnmount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if (updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation({
          ref: this.ref,
          key1: key1 || tableRow.key,
          key2: key2 || tableColumn.key,
          action: 'remove',
        });
      }
      if (this.ref.current) {
        (this.ref.current as any).removeEventListener('mouseup', this.handleClick);
      }
    }

    handleClick() {
      const { tableRow, tableColumn, setFocusedElement } = this.props;
      if (setFocusedElement) {
        setFocusedElement({ key1: key1 || tableRow.key, key2: key2 || tableColumn.key });
      }
    }

    render() {
      return <Component refObject={this.ref} {...this.props} />;
    }
  }
  return ComponentWithNavigation;
};
