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
    this.buttonRef = this.buttonRef.bind(this);
  }
  buttonRef(button) {
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
      containerComponent: Container,
      itemComponent: Item,
      toggleButtonComponent: ToggleButton,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { visible } = this.state;

    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ columns, hiddenColumnNames }, { toggleColumnVisibility }) => (
              <React.Fragment>
                <ToggleButton
                  buttonRef={this.buttonRef}
                  onToggle={this.handleToggle}
                  getMessage={getMessage}
                />
                <Overlay
                  visible={visible}
                  target={this.button}
                  onHide={this.handleHide}
                >
                  <Container>
                    {columnChooserItems(columns, hiddenColumnNames)
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
