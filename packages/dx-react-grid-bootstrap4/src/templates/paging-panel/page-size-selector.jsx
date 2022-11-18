import * as React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from '../parts/pagination';

export const PageSizeSelector = ({
  pageSize,
  onPageSizeChange,
  pageSizes,
  getMessage,
}) => {
  const showAll = getMessage('showAll');
  return (
    <div className="d-inline-block">
      <select
        className="form-control d-sm-none"
        value={pageSize}
        onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
      >
        {pageSizes.map(val => (
          <option key={val} value={val}>
            {val || showAll}
          </option>
        ))}
      </select>
      <Pagination className="d-none d-sm-flex" listClassName="m-0">
        {pageSizes.map(item => (
          <PaginationItem key={item} active={item === pageSize && true}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageSizeChange(item);
              }}
            >
              {item || showAll}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  getMessage: PropTypes.func.isRequired,
};
