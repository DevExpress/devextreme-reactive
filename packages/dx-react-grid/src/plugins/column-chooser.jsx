import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
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

    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.getTarget = this.getTarget.bind(this);
  }
  getTarget(button) {
    this.button = button;
  }
  handleClickButton() {
    this.setState({
      visible: true,
      overlayTarget: findDOMNode(this.button), // eslint-disable-line react/no-find-dom-node
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
            {({ columns, hiddenColumns }, { toggleVisibility }) => ([
              <ToggleButton
                key="toggleButton"
                getTarget={this.getTarget}
                onToggle={this.handleClickButton}
                getMessage={getMessage}
              />,
              <Overlay
                key="overlay"
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
                        onToggle={() => toggleVisibility(item.column.name)}
                      />
                  ))}
                </Container>
              </Overlay>,
            ])}
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
