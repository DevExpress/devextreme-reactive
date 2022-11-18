import PropTypes from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager as Container } from '../templates/paging-panel/pager';
import { withPatchedProps } from '../utils/with-patched-props';

const defaultMessages = {
  rowsPerPage: 'Rows per page:',
};

const PagingPanelWithMessages = withPatchedProps(({ messages, ...restProps }) => ({
  messages: { ...defaultMessages, ...messages },
  ...restProps,
}))(PagingPanelBase);

PagingPanelWithMessages.propTypes = {
  messages: PropTypes.shape({
    showAll: PropTypes.string,
    rowsPerPage: PropTypes.string,
    info: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  }),
};

PagingPanelWithMessages.defaultProps = {
  messages: {},
};

PagingPanelWithMessages.components = PagingPanelBase.components;

export const PagingPanel = withComponents({ Container })(PagingPanelWithMessages);
