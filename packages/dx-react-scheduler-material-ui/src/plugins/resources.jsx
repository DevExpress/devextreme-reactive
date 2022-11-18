import * as React from 'react';
import PropTypes from 'prop-types';
import { Resources as ResourcesBase } from '@devexpress/dx-react-scheduler';
import { DEFAULT_PALETTE } from '../templates/constants';

export const Resources = ({ data, mainResourceName, palette }) => (
  <ResourcesBase
    data={data}
    mainResourceName={mainResourceName}
    palette={palette}
  />
);

Resources.propTypes = {
  data: PropTypes.array,
  mainResourceName: PropTypes.string,
  palette: PropTypes.array,
};

Resources.defaultProps = {
  data: [],
  mainResourceName: undefined,
  palette: DEFAULT_PALETTE,
};
