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
      popoverComponent: PopoverComponent,
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
              {({ columns, hiddenColumns }, { toggleVisibility }) => (
                <PopoverComponent
                  open={open}
                  anchorEl={anchorEl}
                  onRequestClose={this.handleRequestClose}
                >
                  <ContainerComponent>
                    {columnChooserItems(columns, hiddenColumns).map(item => ( //
                      <ItemComponent
                        key={item.column.name}
                        item={item}
                        onToggle={() => toggleVisibility(item.column.name)}
                      />
                    ))}
                  </ContainerComponent>
                </PopoverComponent>
              )}
            </TemplateConnector>
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  popoverComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  buttonComponent: PropTypes.func.isRequired,
};
