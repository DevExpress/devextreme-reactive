import * as React from 'react';
import { KeyboardNavigationComponent, Table } from '../types';

export const withKeyboardNavigation =
<T extends KeyboardNavigationComponent>(key1?: string, key2?: string) =>
(Component: React.ComponentType<Table.CellProps>): React.ComponentType<T> => {
  class ComponentWithNavigation extends React.PureComponent<T> {
    ref: React.RefObject<T>;
    constructor(props) {
      super(props);
      this.ref = props.forwardedRef || React.createRef();
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if (this.ref.current && updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation({
          ref: this.ref,
          key1: key1 || tableRow.key,
          key2: key2 || tableColumn.key,
          action: 'add',
        });
        (this.ref.current as any).addEventListener('mouseup', this.handleClick);
      }
    }

    componentWillUnmount() {
      const { updateRefForKeyboardNavigation, tableRow, tableColumn } = this.props;
      if (this.ref.current && updateRefForKeyboardNavigation) {
        updateRefForKeyboardNavigation({
          ref: this.ref,
          key1: key1 || tableRow.key,
          key2: key2 || tableColumn.key,
          action: 'remove',
        });
        (this.ref.current as any).removeEventListener('mouseup', this.handleClick);
      }
    }

    handleClick(event) {
      const { tableRow, tableColumn, setFocusedElement } = this.props;
      setFocusedElement({ key1: key1 || tableRow.key, key2: key2 || tableColumn.key, event });
    }

    render() {
      const { setFocusedElement, updateRefForKeyboardNavigation, ...restProps } = this.props;
      return <Component forwardedRef={this.ref} {...restProps} />;
    }
  }
  return ComponentWithNavigation;
};
