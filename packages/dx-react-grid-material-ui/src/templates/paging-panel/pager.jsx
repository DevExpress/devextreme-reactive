import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

const styles = theme => ({
  pager: {
    overflow: 'hidden',
    padding: theme.spacing(1.5),
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

class PagerBase extends React.PureComponent {
  constructor(props) {
    super(props)
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { setRefKeyboardNavigation } = this.props;
    setRefKeyboardNavigation && setRefKeyboardNavigation(this.ref, 'paging', 'none')
  }

  render() {
    const {
      currentPage,
      pageSizes,
      totalPages,
      pageSize,
      classes,
      onCurrentPageChange,
      onPageSizeChange,
      totalCount,
      getMessage,
      className,
      setRefKeyboardNavigation,
      ...restProps
    } = this.props;
    return (
      <div
        className={classNames(classes.pager, className)}
        ref={this.ref}
        {...restProps}
      >
        {!!pageSizes.length && (
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
          pageSizes={pageSizes}
          getMessage={getMessage}
        />
        )}
        <Pagination
          totalPages={totalPages}
          totalCount={totalCount}
          currentPage={currentPage}
          onCurrentPageChange={page => onCurrentPageChange(page)}
          pageSize={pageSize}
          getMessage={getMessage}
        />
      </div>
    )
  }
}

PagerBase.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PagerBase.defaultProps = {
  className: undefined,
};

export const Pager = withStyles(styles, { name: 'Pager' })(PagerBase);
