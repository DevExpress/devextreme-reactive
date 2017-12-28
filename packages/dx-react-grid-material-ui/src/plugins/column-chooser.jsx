import React from 'react';
import PropTypes from 'prop-types';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { Overlay } from '../templates/column-chooser/overlay';
import { Container } from '../templates/column-chooser/container';
import { ToggleButton } from '../templates/column-chooser/toggle-button';
import { Item } from '../templates/column-chooser/item';

const defaultMessages = {
  showColumnChooser: 'Show Column Chooser',
};
export class ColumnChooser extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;
    return (
      <ColumnChooserBase
        overlayComponent={Overlay}
        containerComponent={Container}
        toggleButtonComponent={ToggleButton}
        itemComponent={Item}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

ColumnChooser.Container = Container;
ColumnChooser.Button = ToggleButton;
ColumnChooser.Item = Item;
ColumnChooser.Overlay = Overlay;

ColumnChooser.propTypes = {
  messages: PropTypes.shape({
    hiddenColumns: PropTypes.string,
  }),
};

ColumnChooser.defaultProps = {
  messages: {},
};
