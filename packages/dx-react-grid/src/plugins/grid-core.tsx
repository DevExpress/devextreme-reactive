import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { GridProps } from '../types';
import { GridCoreGetters } from './internal';

export class GridCore extends React.PureComponent<GridProps, any> {
  render() {
    const {
      rootComponent: Root,
      ...restProps
    } = this.props;

    return (
      <Plugin>
        <Getter name="skip" value={0} />
        <Getter name="loadedRowsStart" value={0} />
        <GridCoreGetters {...restProps} />

        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}
