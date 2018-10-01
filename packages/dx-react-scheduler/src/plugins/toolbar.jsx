import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class Toolbar extends React.PureComponent {
  render() {
    const {
      rootComponent: Root,
      flexibleSpaceComponent: FlexibleSpaceComponent,
    } = this.props;
    return (
      <Plugin
        name="Toolbar"
      >
        <Template name="header">
          <Root>
            <TemplatePlaceholder name="toolbarContent" />
          </Root>
          <TemplatePlaceholder />
        </Template>
        <Template name="toolbarContent">
          <FlexibleSpaceComponent />
        </Template>
      </Plugin>
    );
  }
}

Toolbar.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  flexibleSpaceComponent: PropTypes.func.isRequired,
};

Toolbar.components = {
  rootComponent: 'Root',
  flexibleSpaceComponent: 'FlexibleSpace',
};
