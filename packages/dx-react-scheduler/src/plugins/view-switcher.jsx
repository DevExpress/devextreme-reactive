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
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.targetRef = this.targetRef.bind(this);
  }
  targetRef(button) {
    this.button = button;
  }
  handleToggle() {
    this.setState({ visible: !this.state.visible });
  }
  handleHide() {
    this.setState({ visible: false });
  }
  render() {
    const {
      overlayComponent: Overlay,
      toggleButtonComponent: ToggleButton,
      listComponent: List,
      itemComponent: Item,
    } = this.props;
    const { visible } = this.state;

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
                <React.Fragment>
                  <ToggleButton
                    currentView={currentView}
                    onClick={this.handleToggle}
                    targetRef={this.targetRef}
                  />
                  <Overlay
                    open={visible}
                    target={this.button}
                    onHide={this.handleHide}
                  >
                    <List>
                      {availableViews.map(item => (
                        <Item
                          key={item}
                          onItemClick={setCurrentView}
                          onHide={this.handleHide}
                          viewName={item}
                        />
                      ))}
                    </List>
                  </Overlay>
                </React.Fragment>
              )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

ViewSwitcher.propTypes = {
  overlayComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  listComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
};
