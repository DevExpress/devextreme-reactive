import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { Dropdown } from 'react-bootstrap';
import { Overlay } from '../templates/column-chooser/overlay';
import { Container } from '../templates/column-chooser/container';
import { Item } from '../templates/column-chooser/item';
import { ToggleButton } from '../templates/column-chooser/toggle-button';

const DropdownBS3 = () => <Dropdown id={new Date().getTime().toString()} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    dropdownComponent={DropdownBS3}
    overlayComponent={Overlay}
    containerComponent={Container}
    itemComponent={Item}
    toggleButtonComponent={ToggleButton}
    {...props}
  />
);

ColumnChooser.Container = Container;
ColumnChooser.Item = Item;
ColumnChooser.Overlay = Overlay;
ColumnChooser.ToggleButton = ToggleButton;
