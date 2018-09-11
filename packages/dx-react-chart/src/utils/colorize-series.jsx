import PropTypes from 'prop-types';
import { patchProps } from './patch-props';

const setColor = ({
  colorDomain, uniqueName, color, ...restProps
}) => ({
  ...restProps,
  color: color || colorDomain(uniqueName),
});

export const withColor = (Target) => {
  const ColoredTarget = patchProps(Target, setColor);
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
