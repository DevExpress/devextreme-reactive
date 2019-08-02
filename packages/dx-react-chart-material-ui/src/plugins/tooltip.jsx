import { Tooltip as TooltipBase } from '@devexpress/dx-react-chart';
import { withComponents } from '@devexpress/dx-react-core';
import { Overlay } from '../templates/tooltip/overlay';
import { Content } from '../templates/tooltip/content';
import { Arrow } from '../templates/tooltip/arrow';
import { Sheet } from '../templates/tooltip/sheet';

export const Tooltip = withComponents({
  Overlay, Content, Sheet, Arrow,
})(TooltipBase);
