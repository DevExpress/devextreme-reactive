import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN, getValueDomainName, addDomain } from '@devexpress/dx-chart-core';
import { withPatchedProps } from '../utils';

// *constructor* is a keyword and any object (except certain Object.create results) has such field.
// Either property is renamed or such check is used.
const sanitizeFactory = value => (value !== Object ? value : undefined);

export class Scale extends React.PureComponent {
  render() {
    const {
      name, min, max, constructor,
    } = this.props;
    const args = { min, max, factory: sanitizeFactory(constructor) };
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
  min: PropTypes.number,
  max: PropTypes.number,
  constructor: PropTypes.func,
};

Scale.defaultProps = {
  min: undefined,
  max: undefined,
  constructor: undefined,
};

export const ArgumentScale = withPatchedProps(props => ({
  ...props,
  name: ARGUMENT_DOMAIN,
}))(Scale);

export const ValueScale = withPatchedProps(props => ({
  ...props,
  name: getValueDomainName(props.name),
}))(Scale);
