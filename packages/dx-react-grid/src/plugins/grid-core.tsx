import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { GridProps } from '../types';
import { GridCoreGetters } from './internal';

export class GridCore extends React.PureComponent<GridProps, any> {
  rootRef: React.RefObject<HTMLTableElement>;
  constructor(props) {
    super(props);

    this.state = {
      ref: {},
    };
    this.rootRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      ref: this.rootRef,
    });
  }

  render() {
    const {
      rootComponent: Root,
      rootProps,
      ...restProps
    } = this.props;
    const { ref } = this.state;

    return (
      <Plugin>
        <Getter name="skip" value={0} />
        <Getter name="loadedRowsStart" value={0} />
        <Getter name="rootRef" value={ref} />
        <GridCoreGetters {...restProps} />

        <Template name="root">
          <Root {...rootProps} rootRef={this.rootRef}>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
