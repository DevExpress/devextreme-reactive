import { Tooltip as TooltipBase, withComponents } from '@devexpress/dx-react-chart';
import { Overlay } from '../templates/tooltip/overlay';
import { Content } from '../templates/tooltip/content';

export const Tooltip = withComponents({ Overlay, Content })(TooltipBase);
