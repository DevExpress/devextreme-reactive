import React from 'react';
import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';

import { getMessagesFormatter, columnChooserItems } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableColumnVisibility' },
  { pluginName: 'Toolbar' },
];
export class ColumnChooser extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.getButtonRef = this.getButtonRef.bind(this);
  }
  getButtonRef(button) {
    this.button = button;
  }
  handleToggle() {
    this.setState({
      visible: true,
      overlayTarget: this.button,
    });
  }
  handleHide() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const {
      overlayComponent: Overlay,
      containerComponent: Container,
      itemComponent: Item,
      toggleButtonComponent: ToggleButton,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { visible, overlayTarget } = this.state;
    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ columns, hiddenColumns }, { toggleColumnVisibility }) => (
              <React.Fragment>
                <ToggleButton
                  getButtonRef={this.getButtonRef}
                  onToggle={this.handleToggle}
                  getMessage={getMessage}
                />
                <Overlay
                  visible={visible}
                  target={overlayTarget}
                  onHide={this.handleHide}
                >
                  <Container>
                    {columnChooserItems(columns, hiddenColumns)
                      .map(item => (
                        <Item
                          key={item.column.name}
                          item={item}
                          onToggle={() => toggleColumnVisibility(item.column.name)}
                        />
                    ))}
                  </Container>
                </Overlay>
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  overlayComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

ColumnChooser.defaultProps = {
  messages: {},
};
