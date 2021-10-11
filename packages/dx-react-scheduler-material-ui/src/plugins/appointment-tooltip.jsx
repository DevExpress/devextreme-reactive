import Repeat from '@mui/icons-material/Repeat';
import { withComponents } from '@devexpress/dx-react-core';
import { AppointmentTooltip as AppointmentTooltipBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/appointment-tooltip/layout';
import { Header } from '../templates/appointment-tooltip/header';
import { Content } from '../templates/appointment-tooltip/content';
import { CommandButton } from '../templates/appointment-tooltip/command-button';

export const AppointmentTooltip = withComponents({
  Layout, Header, Content, CommandButton, RecurringIcon: Repeat,
})(AppointmentTooltipBase);
