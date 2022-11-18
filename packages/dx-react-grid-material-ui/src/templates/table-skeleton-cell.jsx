import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

const PREFIX = 'TableSceletonCell';
export const classes = {
  cell: `${PREFIX}-cell`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    padding: theme.spacing(1),
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACqCAYAAABbAOqQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjYWQ2ODE5MS00ZDMxLWRjNGYtOTU0NC1jNjJkMTIxMjY2M2IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjY1RUVFQzAzRDYzMTFFODlFNThCOUJBQjU4Q0EzRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY1RUVFQkYzRDYzMTFFODlFNThCOUJBQjU4Q0EzRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVlMjM1Y2U0LTc5ZWUtNGI0NC05ZjlkLTk2NTZmZGFjNjhhNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjk1OTQ2MjBiLTUyMTQtYTM0Yy04Nzc5LTEwMmEyMTY4MTlhOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvLbJKYAAADrSURBVHja7N3BDYBACABBsQn7L48q0BoMD5SZxAZuc74gF1V1MMfpCARBEEEQRBAEEQRBdovnuxxDq3RD/LIQRBAEQRBBEEQQBBEEQQQBAAAAAAAAABhi8gZVbgxi6kQQBBEEQQRBEEEQRBAEQRBBAAAAAAAAAAAabX2Daux2lqkTQRBEEAQRBEEEQRBBEARBBAEAAAAAAAAAaLR1g2osUyeCIIggCCIIggiCIIIgCIIIAgAAAAAAAADQ6KsbVPnXIKZOBEEQQRBEEAQRBEEEQRAEEYRXoqqcghuCIIIgiCAIIgiCCMIUtwADALYCCr92l++TAAAAAElFTkSuQmCC)',
    backgroundRepeat: 'no-repeat repeat',
    backgroundOrigin: 'content-box',
  },
}));

export const TableSkeletonCell = ({
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <StyledTableCell
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

TableSkeletonCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSkeletonCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
