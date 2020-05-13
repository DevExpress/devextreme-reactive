import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { isReadyToRenderSeries } from '@devexpress/dx-chart-core';

export class ControllerComponent extends React.PureComponent {
  isPreviousDataEmpty: boolean = true;

  readyToRenderSeriesComputed = ({
    layouts, centerDivRef, data, axesExist,
  }: Getters) => {
    const isPreviousDataEmpty = this.isPreviousDataEmpty;
    this.isPreviousDataEmpty = !data.length;
    return isReadyToRenderSeries(layouts, centerDivRef, isPreviousDataEmpty, !!axesExist);
  }

  render () {
    return (
    <Plugin name="ControllerComponent">
      <Getter name="readyToRenderSeries" computed={this.readyToRenderSeriesComputed} />
    </Plugin>
    );
  }
}
