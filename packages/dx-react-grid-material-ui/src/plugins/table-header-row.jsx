import PropTypes from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell as Cell } from '../templates/table-header-cell';
import { TableRow as Row } from '../templates/table-row';
import { SortLabel } from '../templates/table-header-cell/sort-label';
import { GroupButton } from '../templates/table-header-cell/group-button';
import { Title } from '../templates/table-header-cell/title';
import { Content } from '../templates/table-header-cell/content';
import { withPatchedProps } from '../utils/with-patched-props';

const defaultMessages = {
  sortingHint: 'Sort',
};

const TableHeaderRowWithMessages = withPatchedProps(({ messages, ...restProps }) => ({
  messages: { ...defaultMessages, ...messages },
  ...restProps,
}))(TableHeaderRowBase);

TableHeaderRowWithMessages.propTypes = {
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRowWithMessages.defaultProps = {
  messages: {},
};

TableHeaderRowWithMessages.components = TableHeaderRowBase.components;

export const TableHeaderRow = withComponents({
  Cell, Row, Content, SortLabel, Title, GroupButton,
})(TableHeaderRowWithMessages);

TableHeaderRow.ROW_TYPE = TableHeaderRowBase.ROW_TYPE;
