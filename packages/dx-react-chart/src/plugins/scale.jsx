import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN, getValueDomainName, addDomain } from '@devexpress/dx-chart-core';
import { withPatchedProps } from '../utils';

export class Scale extends React.PureComponent {
  render() {
    const { name, factory, modifyDomain } = this.props;
    const args = { factory, modifyDomain };
    const getDomains = ({ domains }) => addDomain(domains, name, args);
    return (
      <Plugin name="Scale">
        <Getter name="domains" computed={getDomains} />
      </Plugin>
    );
  }
}

Scale.propTypes = {
  name: PropTypes.string.isRequired,
  factory: PropTypes.func,
  modifyDomain: PropTypes.func,
};

Scale.defaultProps = {
  factory: undefined,
  modifyDomain: undefined,
};

export const ArgumentScale = withPatchedProps(props => ({
  ...props,
  name: ARGUMENT_DOMAIN,
}))(Scale);

export const ValueScale = withPatchedProps(props => ({
  ...props,
  name: getValueDomainName(props.name),
}))(Scale);
