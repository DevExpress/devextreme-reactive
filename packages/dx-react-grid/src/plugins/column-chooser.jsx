import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  Template, TemplatePlaceholder, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';

import { columnChooserItems } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableColumnVisibility' },
  { pluginName: 'Toolbar' },
];
export class ColumnChooser extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      overlayTarget: findDOMNode(this.button), // eslint-disable-line react/no-find-dom-node
    };

    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  handleClickButton() {
    this.setState({
      visible: true,
      overlayTarget: findDOMNode(this.button), // eslint-disable-line react/no-find-dom-node
    });
  }
  handleRequestClose() {
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
    } = this.props;
    const { visible, overlayTarget } = this.state;
    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ columns, hiddenColumns }, { toggleVisibility }) => (
              <div>
                <ToggleButton
                  getRef={(button) => { this.button = button; }}
                  onClick={this.handleClickButton}
                />
                <Overlay
                  visible={visible}
                  target={overlayTarget}
                  onHide={this.handleRequestClose}
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
                </Overlay>
              </div>
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
};
