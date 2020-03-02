import { withComponents } from '@devexpress/dx-react-core';
import { ExportPanel as ExportPanelBase } from '@devexpress/dx-react-grid';
import { ToggleButton } from '../templates/export-panel/toggle-button';
import { Menu } from '../templates/export-panel/menu';
import { MenuItem } from '../templates/export-panel/menu-item';

export const ExportPanel = withComponents({
  ToggleButton, Menu, MenuItem,
})(ExportPanelBase);
