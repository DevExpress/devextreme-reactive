import { withComponents } from '@devexpress/dx-react-core';
import { TodayButton as TodayButtonBase } from '@devexpress/dx-react-scheduler';
import { TodayButton as Button } from '../templates/today-button/today-button';

export const TodayButton = withComponents({ Button })(TodayButtonBase);
