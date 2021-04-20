import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { GridProps } from '../types';
import { GridCoreGetters } from './internal';

export class GridCore extends React.PureComponent<GridProps, any> {
  constructor(props) {
    super(props)

    this.state = {
      ref: undefined
    }
    this.setRef = this.setRef.bind(this);
  }
  setRef = (ref) => {
    this.setState({
      ref: ref
    })
  };

  render() {
    const {
      rootComponent: Root,
      ...restProps
    } = this.props;

    const {ref} = this.state;
    return (
      <Plugin>
        <Getter name="skip" value={0} />
        <Getter name="loadedRowsStart" value={0} />
        <Getter name="refTable" value={ref} />
        <GridCoreGetters {...restProps} />

        <Template name="root">
          <Root refObj={this.setRef}>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
