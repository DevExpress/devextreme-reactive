import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export class SchedulerCore extends React.PureComponent {
  render() {
    const {
      data,
      currentDate,
      rootComponent: Root,
      getTitle,
      getStartDate,
      getEndDate,
    } = this.props;
    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="data" value={data} />
        <Getter name="currentDate" value={currentDate} />
        <Getter name="getAppointmentTitle" value={getTitle} />
        <Getter name="getAppointmentStartDate" value={getStartDate} />
        <Getter name="getAppointmentEndDate" value={getEndDate} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

SchedulerCore.propTypes = {
  currentDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  rootComponent: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  getTitle: PropTypes.func.isRequired,
  getStartDate: PropTypes.func.isRequired,
  getEndDate: PropTypes.func.isRequired,
};
