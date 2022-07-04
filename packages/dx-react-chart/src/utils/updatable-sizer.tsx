import * as React from 'react';
import { Sizer, SizerProps } from '@devexpress/dx-react-core';

// It is located in a separate file only for testing purpose -
// it should actually be placed next to PaneLayout.
export class UpdatableSizer extends React.PureComponent<SizerProps> {
  ref = React.createRef<Sizer>();

  componentDidUpdate() {
    this.props.onSizeChange(this.ref.current!.getSize());
  }

  render() {
    return <Sizer ref={this.ref} {...this.props} />;
  }
}
