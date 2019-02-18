import * as React from 'react';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { TitleProps } from '../types';

const defaultProps = {
  position: 'top',
};
/** @internal */
export class Title extends React.PureComponent<TitleProps & typeof defaultProps> {
  static components = {
    textComponent: 'Text',
  };
  static defaultProps = defaultProps;
  render() {
    const {
      textComponent: Text,
      text,
      position,
      ...restProps
    } = this.props;
    const placeholder = position;
    return (
      <Plugin name="Title">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <Text text={text} {...restProps} />
        </Template>
      </Plugin>
    );
  }
}
