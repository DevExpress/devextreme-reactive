import * as React from 'react';
import { AppointmentTooltip as AppointmentTooltipBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-tooltip/layout';
import { Head } from '../templates/appointment-tooltip/head';
import { Content } from '../templates/appointment-tooltip/content';
import { OpenButton } from '../templates/appointment-tooltip/open-button';
import { DeleteButton } from '../templates/appointment-tooltip/delete-button';
import { CloseButton } from '../templates/appointment-tooltip/close-button';

export class AppointmentTooltip extends React.PureComponent {
  render() {
    return (
      <AppointmentTooltipBase
        tooltipComponent={Layout}
        headComponent={Head}
        contentComponent={Content}
        openButtonComponent={OpenButton}
        deleteButtonComponent={DeleteButton}
        closeButtonComponent={CloseButton}
        {...this.props}
      />
    );
  }
}
