import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { getReadiness } from '@devexpress/dx-chart-core';

const doGetReadiness = ({ layouts, centerDivRef }: Getters) => getReadiness(layouts, centerDivRef);

export class ControllerComponent extends React.PureComponent {
  render () {
    return (
    <Plugin name="ControllerComponent">
      <Getter name="readyToRenderSeries" computed={doGetReadiness} />
    </Plugin>
    );
  }
}
