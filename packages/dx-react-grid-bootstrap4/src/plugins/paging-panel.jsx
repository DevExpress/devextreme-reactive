import { PagingPanel as PagingPanelBase, withComponents } from '@devexpress/dx-react-grid';
import { Pager as Container } from '../templates/paging-panel/pager';

export const PagingPanel = withComponents({ Container })(PagingPanelBase);
