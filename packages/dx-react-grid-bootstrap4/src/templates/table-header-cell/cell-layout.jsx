import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { ResizingControl } from './resizing-control';

export const CellLayout = ({
  column, tableColumn,
  draggingEnabled, resizingEnabled, dragging,
  onWidthChange, onWidthDraft, onWidthDraftCancel, getCellWidth,
  tableRow, className, children, forwardedRef,
  ...restProps
}) => {
  const cellRef = React.useRef();
  const getWidthGetter = React.useCallback(() => {
    const node = cellRef.current;
    return node && getCellWidth(() => {
      const { width } = node.getBoundingClientRect();
      return width;
    });
  });

  React.useEffect(() => {
    getWidthGetter();
  }, []);

  return (
    <th
      className={classNames({
        'position-relative dx-g-bs4-header-cell': true,
        'dx-g-bs4-user-select-none': draggingEnabled,
        'dx-g-bs4-cursor-pointer': draggingEnabled,
        'dx-g-bs4-inactive': dragging || (tableColumn && tableColumn.draft),
        'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      }, className)}
      scope="col"
      ref={(node) => {
        cellRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          // eslint-disable-next-line no-param-reassign
          forwardedRef.current = node;
        }
      }}
      {...restProps}
    >
      <div
        className="d-flex flex-direction-row align-items-center"
      >
        {children}
      </div>
      {resizingEnabled && (
        <ResizingControl
          onWidthChange={onWidthChange}
          onWidthDraft={onWidthDraft}
          onWidthDraftCancel={onWidthDraftCancel}
        />
      )}
    </th>
  );
};

CellLayout.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  dragging: PropTypes.bool,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  getCellWidth: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

CellLayout.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  dragging: false,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  className: undefined,
  children: undefined,
  getCellWidth: () => {},
  forwardedRef: undefined,
};
