import * as React from 'react';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';

const defaultProps = {
  position: 'top',
};
type TitleDefaultProps = Readonly<typeof defaultProps>;
type TitleProps = {
  text: string, textComponent: any,
} & Partial<TitleDefaultProps>;
export class Title extends React.PureComponent<TitleProps> {
  static components: PluginComponents;
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
        <Template name={placeholder!}>
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
