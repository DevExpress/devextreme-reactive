import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  Template, TemplatePlaceholder, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';

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
      containerComponent: ContainerComponent,
      itemComponent: ItemComponent,
      buttonComponent: Button,
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
            <Button
              refFunc={(node) => { this.button = node; }}
              onButtonClick={this.handleClickButton}
            />
            <TemplateConnector>
              {({ items }, { toggleVisibility }) => {
                return (
                  <ContainerComponent
                    open={open}
                    anchorEl={anchorEl}
                    onRequestClose={this.handleRequestClose}
                  >
                    {items.map(item => (
                      <ItemComponent
                        key={item.column.name}
                        item={item}
                        onToggle={() => toggleVisibility(item.column.name)}
                      />
                    ))}
                  </ContainerComponent>
                );
              }}
            </TemplateConnector>
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
};
