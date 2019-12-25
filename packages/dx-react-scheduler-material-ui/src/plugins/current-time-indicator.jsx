import { withComponents } from '@devexpress/dx-react-core';
import { CurrentTimeIndicator as CurrentTimeIndicatorBase } from '@devexpress/dx-react-scheduler';
import { Indicator } from '../templates/current-time-indicator/indicator';

export const CurrentTimeIndicator = withComponents({ Indicator })(CurrentTimeIndicatorBase);
