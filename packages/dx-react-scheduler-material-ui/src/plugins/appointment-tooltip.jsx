import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentTooltip as AppointmentTooltipBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-tooltip/layout';
import { Head } from '../templates/appointment-tooltip/head';
import { Content } from '../templates/appointment-tooltip/content';
import { CommandButton } from '../templates/appointment-tooltip/command-button';

export const AppointmentTooltip = withComponents({
  Layout, Head, Content, CommandButton,
})(AppointmentTooltipBase);
