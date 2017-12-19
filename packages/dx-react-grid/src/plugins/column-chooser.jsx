import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  Template, TemplatePlaceholder, PluginContainer,
} from '@devexpress/dx-react-core';

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
  }
  handleClickButton() {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  }

  render() {
    const {
      containerComponent,
      itemComponent,
      buttonComponent: Button,
    } = this.props;

    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="header">
          <TemplatePlaceholder />
          <Button
            refFunc={(node) => { this.button = node; }}
            onButtonClick={this.handleClickButton}
          />
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
