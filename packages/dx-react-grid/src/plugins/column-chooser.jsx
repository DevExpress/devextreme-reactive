import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Template, TemplateConnector } from '@devexpress/dx-grid-core';
import { PluginContainer, Getter, TemplatePlaceholder } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { pluginName: 'TableColumnVisibility' },
];
export class ColumnChooser extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
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
      containerComponent: Container,
      itemComponent: Item,
      buttonComponent: Button,
    } = this.props;
    const { open, anchorEl } = this.state;
    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent" >
          <TemplatePlaceholder />
          <Button
            refFunc={(node) => { this.button = node; }}
            onButtonClick={this.handleClickButton}
          />

          {params => (
            <TemplateConnector>
              {({ items }, { toggleVisibility }) => (
                <Container
                  {...params}
                  open={open}
                  anchorEl={anchorEl}
                  onRequestClose={this.handleRequestClose}
                >
                  {items.map(item => (
                    <Item
                      key={item.column.name}
                      item={item}
                      onToggle={() => toggleVisibility(item)}
                    />
                  ))}
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>

        <Getter name="tableColumns" computed={this.tableColumnsComputed} />
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
};
