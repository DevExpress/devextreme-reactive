import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { CurrentTimeIndicatorProps, CurrentTimeIndicatorState } from '../types';

const pluginDependencies = [];

const BASE_INTERVAL = 60000;

class CurrentTimeIndicatorBase extends React.PureComponent<
  CurrentTimeIndicatorProps, CurrentTimeIndicatorState
> {
  static components: PluginComponents = {
    indicatorComponent: 'Indicator',
  };
  indicatorUpdateTimer;

  constructor(props) {
    super(props);
    this.state = { currentTime: Date.now() };
  }

  componentDidMount() {
    this.setIndicatorUpdateTimer();
  }

  componentDidUpdate() {
    clearTimeout(this.indicatorUpdateTimer);
    this.setIndicatorUpdateTimer();
  }

  setIndicatorUpdateTimer() {
    this.indicatorUpdateTimer = setTimeout(
      () => this.setState({
        currentTime: Date.now(),
      }),
      this.props.updateInterval || BASE_INTERVAL,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.indicatorUpdateTimer);
  }

  // viewCellsDataComputed = memoize(currentTime => ({ viewCellsData }) => {
  //   // console.log(viewCellsData)
  //   return viewCellsData.map((rowCellData) => {
  //     return rowCellData.map((cellData) => {
  //       return cellData.startDate.getTime() <= currentTime
  //         && cellData.endDate.getTime() >= currentTime
  //         ? { ...cellData, isNow: true }
  //         : cellData;
  //     })
  //   });
  // });

  render() {
    const { currentTime } = this.state;
    const { indicatorComponent, shadePastAppointments, shadePastCells } = this.props;
    return (
      <Plugin
        name="CurrentTimeIndicator"
        dependencies={pluginDependencies}
      >
        {/* <Getter
          name="viewCellsData"
          computed={this.viewCellsDataComputed(currentTime)}
        /> */}
        <Template
          name="cell"
        >
          {params => (
            <TemplatePlaceholder
              params={{
                ...params,
                currentTime: new Date(currentTime),
                currentTimeIndicatorComponent: indicatorComponent,
              }}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const CurrentTimeIndicator: React.ComponentType<
  CurrentTimeIndicatorProps
> = CurrentTimeIndicatorBase;
