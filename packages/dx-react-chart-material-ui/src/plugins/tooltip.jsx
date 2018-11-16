import { Tooltip as TooltipBase } from '@devexpress/dx-react-chart';
import { withComponents } from '@devexpress/dx-react-core';
import { Overlay } from '../templates/tooltip/overlay';
import { Content } from '../templates/tooltip/content';

export const Tooltip = withComponents({ Overlay, Content })(TooltipBase);
