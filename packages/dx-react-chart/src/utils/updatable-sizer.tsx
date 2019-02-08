import * as React from 'react';
import { Sizer } from '@devexpress/dx-react-core';

// It is located in a separate file only for testing purpose -
// it should actually be placed next to PaneLayout.
export class UpdatableSizer extends React.PureComponent {
  ref: React.RefObject<any>;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    this.ref.current!.setupListeners();
  }

  render() {
    return <Sizer ref={this.ref} {...this.props} />;
  }
}
