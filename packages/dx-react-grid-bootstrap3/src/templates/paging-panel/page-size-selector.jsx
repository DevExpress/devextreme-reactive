import * as React from 'react';
import PropTypes from 'prop-types';

export const PageSizeSelector = ({
  pageSize,
  onPageSizeChange,
  pageSizes,
  getMessage,
}) => {
  const showAll = getMessage('showAll');
  return (
    <div style={{ display: 'inline-block' }}>
      <select
        className="form-control visible-xs-inline-block"
        style={{ width: 'auto' }}
        value={pageSize}
        onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
      >
        {pageSizes.map(val => (
          <option key={val} value={val}>
            {val || showAll}
          </option>
        ))}
      </select>
      <ul
        className="pagination hidden-xs"
        style={{
          margin: 0,
          verticalAlign: 'bottom',
        }}
      >
        {pageSizes.map(item => (
          <li key={item} className={item === pageSize ? 'active' : ''}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageSizeChange(item);
              }}
            >
              {item || showAll}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  getMessage: PropTypes.func.isRequired,
};
