import * as PropTypes from 'prop-types';
import { withPatchedProps } from './patch-props';

const withColorCore = withPatchedProps(({
  colorDomain, uniqueName, color, ...restProps
}) => ({
  color: color || colorDomain(uniqueName),
  ...restProps,
}));

export const withColor = (Target) => {
  const ColoredTarget = withColorCore(Target);
  ColoredTarget.propTypes = {
    color: PropTypes.string,
    colorDomain: PropTypes.func.isRequired,
    uniqueName: PropTypes.string.isRequired,
  };
  ColoredTarget.defaultProps = {
    color: undefined,
  };
  return ColoredTarget;
};
