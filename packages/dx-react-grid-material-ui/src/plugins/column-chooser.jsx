import PropTypes from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { Overlay } from '../templates/column-chooser/overlay';
import { Container } from '../templates/column-chooser/container';
import { ToggleButton } from '../templates/column-chooser/toggle-button';
import { Item } from '../templates/column-chooser/item';
import { withPatchedProps } from '../utils/with-patched-props';

const defaultMessages = {
  showColumnChooser: 'Show Column Chooser',
};

const ColumnChooserWithMessages = withPatchedProps(({ messages, ...restProps }) => ({
  messages: { ...defaultMessages, ...messages },
  ...restProps,
}))(ColumnChooserBase);

ColumnChooserWithMessages.propTypes = {
  messages: PropTypes.shape({
    hiddenColumnNames: PropTypes.string,
  }),
};

ColumnChooserWithMessages.defaultProps = {
  messages: {},
};

ColumnChooserWithMessages.components = ColumnChooserBase.components;

export const ColumnChooser = withComponents({
  Container, Item, Overlay, ToggleButton,
})(ColumnChooserWithMessages);
