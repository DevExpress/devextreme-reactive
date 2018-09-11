import React from 'react';
import PropTypes from 'prop-types';

export const makeSeries = (d3Func) => {
  class Series extends React.PureComponent {
    render() {
      const {
        seriesComponent: Path,
        ...restProps
      } = this.props;
      return <Path path={d3Func} {...restProps} />;
    }
  }

  Series.propTypes = {
    seriesComponent: PropTypes.func.isRequired,
  };

  return Series;
};
