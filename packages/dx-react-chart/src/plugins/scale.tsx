import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN, getValueDomainName, addDomain } from '@devexpress/dx-chart-core';
import { withPatchedProps } from '../utils';
import { ScaleProps } from '../types';

export class Scale extends React.PureComponent<ScaleProps> {
  render() {
    const { name, factory, modifyDomain } = this.props;
    const args = { factory, modifyDomain };
    const getDomains = ({ domains }: Getters) => addDomain(domains, name, args);
    return (
      <Plugin name="Scale">
        <Getter name="domains" computed={getDomains} />
      </Plugin>
    );
  }
}

export const ArgumentScale = withPatchedProps(props => ({
  ...props,
  name: ARGUMENT_DOMAIN,
}))(Scale);

export const ValueScale = withPatchedProps(props => ({
  ...props,
  name: getValueDomainName(props.name),
}))(Scale);
