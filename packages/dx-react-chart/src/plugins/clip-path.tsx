import * as React from 'react';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { ClipPathPropsBase } from '../types';
import { ClipPath as ClipRect } from '../templates/clip-path';

export class ClipPath extends React.PureComponent<ClipPathPropsBase> {
  render() {
    return (
      <Plugin name="ClipPath">
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ layouts }) => (
              <ClipRect width={layouts.pane.width} height={layouts.pane.height} {...this.props} />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
