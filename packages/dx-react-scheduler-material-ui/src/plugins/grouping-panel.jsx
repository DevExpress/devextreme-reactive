import { withComponents } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-scheduler';
import { HorizontalLayout } from '../templates/grouping-panel/horizontal-layout';
import { VerticalLayout } from '../templates/grouping-panel/vertical-layout';
import { Cell } from '../templates/grouping-panel/cell';
import { Row } from '../templates/views/common/row';

export const GroupingPanel = withComponents({
  HorizontalLayout, VerticalLayout, Cell, Row,
})(GroupingPanelBase);
