import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Pagination, Pager as BootstrapPager } from 'react-bootstrap';
import { firstRowOnPage, lastRowOnPage } from '@devexpress/dx-grid-core';
import { PageSizeSelector } from './page-size-selector';

export const Pager = ({
  currentPage,
  onCurrentPageChange,
  totalPages,
  pageSize,
  onPageSizeChange,
  allowedPageSizes,
  totalCount,
  getMessage,
  className,
  ...restProps
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);

  return (
    <div
      className={classNames('clearfix', className)}
      {...restProps}
    >
      {!!allowedPageSizes.length && <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        allowedPageSizes={allowedPageSizes}
        getMessage={getMessage}
      />}
      <Pagination
        style={{
          margin: 0,
          verticalAlign: 'bottom',
        }}
        className="pull-right hidden-xs"
        items={totalPages || 1}
        activePage={currentPage + 1}
        boundaryLinks
        maxButtons={3}
        onSelect={page => onCurrentPageChange(page - 1)}
      />
      <BootstrapPager
        className="pull-right visible-xs"
        style={{ margin: 0 }}
      >
        <BootstrapPager.Item
          disabled={currentPage === 0}
          onClick={() => onCurrentPageChange(currentPage - 1)}
        >
          &laquo;
        </BootstrapPager.Item>
        {' '}
        <BootstrapPager.Item
          disabled={currentPage === totalPages - 1 || totalCount === 0}
          onClick={() => onCurrentPageChange(currentPage + 1)}
        >
          &raquo;
        </BootstrapPager.Item>
      </BootstrapPager>
      <span className="pull-right visible-xs" style={{ marginRight: '20px' }}>
        <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: '32px' }}>
          {getMessage('info', { from, to, count: totalCount })}
        </span>
      </span>
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Pager.defaultProps = {
  className: undefined,
};
