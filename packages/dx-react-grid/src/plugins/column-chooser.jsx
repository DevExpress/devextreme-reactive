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
      open: false,
      anchorEl: findDOMNode(this.button),
    };
    this.button = null;

    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  handleClickButton() {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    const {
      overlayComponent: Overlay,
      containerComponent: Container,
      itemComponent: Item,
      buttonComponent: ToggleButton,
    } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <div>
            <ToggleButton
              refFunc={(node) => { this.button = node; }}
              onButtonClick={this.handleClickButton}
            />
            <TemplateConnector>
              {({ columns, hiddenColumns }, { toggleVisibility }) => (
                <Overlay
                  open={open}
                  anchorEl={anchorEl}
                  onRequestClose={this.handleRequestClose}
                >
                  <Container>
                    {columnChooserItems(columns, hiddenColumns).map(item => ( //
                      <Item
                        key={item.column.name}
                        item={item}
                        onToggle={() => toggleVisibility(item.column.name)}
                      />
                    ))}
                  </Container>
                </Overlay>
              )}
            </TemplateConnector>
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  overlayComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
};
