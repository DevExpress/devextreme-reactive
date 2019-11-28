import { withComponents } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-scheduler';
import { Container } from '../templates/grouping-panel/container';
import { HorizontalLayout } from '../templates/grouping-panel/horizontal-layout';
import { Cell } from '../templates/grouping-panel/cell';
import { Row } from '../templates/views/common/row';

export const GroupingPanel = withComponents({
  HorizontalLayout, Cell, Row, Container,
})(GroupingPanelBase);
