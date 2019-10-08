import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Layout = ({
  labelComponent: Label,
  cellsData,
  formatDate,
  ...restProps
}) => (
  <div {...restProps}>
    <Label key={cellsData[0][0].startDate} />
    {cellsData.map((days, index) => (
      index !== cellsData.length - 1 && (
        <Label
          time={days[0].endDate}
          formatDate={formatDate}
          key={days[0].endDate}
        />
      )
    ))}
    <Label key={cellsData[cellsData.length - 1][0].endDate} />
  </div>
);

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
};
