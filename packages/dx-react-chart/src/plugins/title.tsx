import * as React from 'react';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { TitleProps } from '../types';

class TitleBase extends React.PureComponent<TitleProps> {
  static components: PluginComponents = {
    textComponent: 'Text',
  };
  static defaultProps: Partial<TitleProps> = {
    position: 'top',
  };

  render() {
    const {
      textComponent: Text,
      text,
      position,
    } = this.props;
    const placeholder = position!;
    return (
      <Plugin name="Title">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <Text text={text} />
        </Template>
      </Plugin>
    );
  }
}
export const Title: React.ComponentType<TitleProps> = TitleBase;
