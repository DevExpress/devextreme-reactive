import * as React from 'react';
import * as PropTypes from 'prop-types';

export const withColor = (Series) => {
  const ColorizedSeries = ({
    colorDomain, uniqueName, color: seriesColor, ...restProps
  }) => {
    const color = colorDomain(uniqueName);
    return <Series color={seriesColor || color} {...restProps} />;
  };
  ColorizedSeries.propTypes = {
    color: PropTypes.string,
    colorDomain: PropTypes.func.isRequired,
    uniqueName: PropTypes.string.isRequired,
  };
  ColorizedSeries.defaultProps = {
    color: undefined,
  };

  return ColorizedSeries;
};
