import { Tooltip as TooltipBase, withComponents } from '@devexpress/dx-react-chart';
import { Overlay } from '../templates/tooltip/popover';

export const Tooltip = withComponents({ Overlay })(TooltipBase);
