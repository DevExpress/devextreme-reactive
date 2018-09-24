import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

export class ViewSwitcher extends React.PureComponent {
  render() {
    const {
      switcherComponent: Switcher,
    } = this.props;

    return (
      <Plugin
        name="ViewSwitcher"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              currentView,
              availableViews,
            }, {
              setCurrentView,
            }) => (
              <Switcher
                currentView={currentView}
                availableViews={availableViews}
                onItemClick={setCurrentView}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

ViewSwitcher.propTypes = {
  switcherComponent: PropTypes.func.isRequired,
};

ViewSwitcher.components = {
  switcherComponent: 'Switcher',
};
