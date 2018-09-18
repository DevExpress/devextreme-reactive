import * as React from 'react';
import { AppointmentTooltip as AppointmentTooltipBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-tooltip/layout';
import { Head } from '../templates/appointment-tooltip/head';
import { Content } from '../templates/appointment-tooltip/content';
import { CommandButton } from '../templates/appointment-tooltip/command-button';

export class AppointmentTooltip extends React.PureComponent {
  render() {
    return (
      <AppointmentTooltipBase
        layoutComponent={Layout}
        headComponent={Head}
        contentComponent={Content}
        commandButtonComponent={CommandButton}
        {...this.props}
      />
    );
  }
}

AppointmentTooltip.Layout = Layout;
AppointmentTooltip.Head = Head;
AppointmentTooltip.Content = Content;
AppointmentTooltip.CommandButton = CommandButton;
