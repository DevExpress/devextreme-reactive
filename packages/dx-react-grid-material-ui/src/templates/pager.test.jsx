import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createMount } from 'material-ui/test-utils';
import { Pager } from './pager';
import { Pagination } from './pagination';
import { PageSizeSelector } from './page-size-selector';

injectTapEventPlugin();

describe('Pager', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  describe('#render', () => {
    const mountPager = ({
      currentPage,
      totalPages,
      pageSize,
      totalCount,
      classes = {},
      allowedPageSizes = [],
      showAllText,
      onCurrentPageChange = () => {},
      onPageSizeChange = () => {},
    }) => mount(
      <Pager
        currentPage={currentPage}
        allowedPageSizes={allowedPageSizes}
        totalPages={totalPages}
        pageSize={pageSize}
        classes={classes}
        totalCount={totalCount}
        showAllText={showAllText}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
      />);

    it('can render pagination', () => {
      const pager = mountPager({
        currentPage: 1,
        totalPages: 3,
        pageSize: 5,
        totalCount: 15,
      });
      const pagination = pager.find(Pagination);

      expect(pagination).toHaveLength(1);
    });

    it('can render page size selector', () => {
      const pager = mountPager({
        currentPage: 1,
        totalPages: 3,
        pageSize: 5,
        totalCount: 15,
        allowedPageSizes: [5, 10],
      });
      const pageSizeSelector = pager.find(PageSizeSelector);

      expect(pageSizeSelector).toHaveLength(1);
    });

    it('doesn\'t render page size selector if the allowedPageSizes option is not defined', () => {
      const pager = mountPager({
        currentPage: 1,
        totalPages: 3,
        pageSize: 5,
        totalCount: 15,
      });
      const pageSizeSelector = pager.find(PageSizeSelector);

      expect(pageSizeSelector).toHaveLength(0);
    });
  });
});
