// BLOCK:imports
import classNames from 'clsx';
// BLOCK:imports

// BLOCK:body
const TooltipLabelCell = ({ className, ...props }) => (
  <span className={classNames('text-black-50', className)} {...props} />
);
const TooltipValueCell = props => (
  <span {...props} />
);
const TooltipSplitter = ({ className, ...props }) => (
  <hr className={classNames('mt-1 mb-1', className)} {...props} />
);
const TooltipHeader = props => (
  <h6 {...props} /> // eslint-disable-line jsx-a11y/heading-has-content
);

const ResetButton = props => (
  <button type="button" className="btn btn-outline-primary m-2" {...props}>Reset</button>
);
// BLOCK:body
