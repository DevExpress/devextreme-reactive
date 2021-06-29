import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pageCount } from '@devexpress/dx-grid-core';
import { PagingPanelProps } from '../types';

const pluginDependencies = [
  { name: 'PagingState' },
];

const defaultMessages = {
  showAll: 'All',
  info: ({ from, to, count }) => `${from}${from < to ? `-${to}` : ''} of ${count}`,
};

class PagingPanelBase extends React.PureComponent<PagingPanelProps> {
  static defaultProps = {
    pageSizes: [],
    messages: {},
  };
  static components = {
    containerComponent: 'Container',
  };

  render() {
    const {
      containerComponent: Pager,
      pageSizes,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="PagingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="footer">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentPage, pageSize, totalCount, keyboardNavigationParams }, { setCurrentPage, setPageSize }) => (
              <Pager
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={pageCount(totalCount, pageSize)}
                pageSizes={pageSizes!}
                getMessage={getMessage}
                onCurrentPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                updateRefForKeyboardNavigation={keyboardNavigationParams ?
                   keyboardNavigationParams.updateRefForKeyboardNavigation : undefined}
                setFocusedElement={keyboardNavigationParams ? 
                  keyboardNavigationParams.setFocusedElement : undefined}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the paging panel used for navigation through data pages. */
export const PagingPanel: React.ComponentType<PagingPanelProps> = PagingPanelBase;
