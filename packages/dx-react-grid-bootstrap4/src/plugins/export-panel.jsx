import { withComponents } from '@devexpress/dx-react-core';
import { ExportPanel as ExportPanelBase } from '@devexpress/dx-react-grid';
import { ExportButton } from '../templates/export-button';

export const ExportPanel = withComponents({ ExportButton })(ExportPanelBase);
