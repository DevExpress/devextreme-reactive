import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin } from '@devexpress/dx-react-core';

export class Scale extends React.PureComponent {
  render() {
    return (
      <Plugin name="Scale" />
    );
  }
}

Scale.propTypes = {
};

Scale.defaultProps = {
};
