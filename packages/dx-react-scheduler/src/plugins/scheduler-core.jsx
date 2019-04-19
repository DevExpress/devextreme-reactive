import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { appointments, dateTimeFormat } from '@devexpress/dx-scheduler-core';

export class SchedulerCore extends React.PureComponent {
  render() {
    const {
      data,
      rootComponent: Root,
      locale,
    } = this.props;

    return (
      <Plugin
        name="SchedulerCore"
      >
        <Getter name="appointments" value={appointments(data)} />
        <Getter name="dateFormat" value={dateTimeFormat(locale)} />
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
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
