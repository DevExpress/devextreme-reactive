import * as React from 'react';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { TitleProps } from '../types';

const defaultProps = {
  position: 'top',
};
type TitleDefaultProps = Readonly<typeof defaultProps>;
export class Title extends React.PureComponent<TitleProps & TitleDefaultProps> {
  static components: PluginComponents;
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

Title.components = {
  textComponent: 'Text',
};
