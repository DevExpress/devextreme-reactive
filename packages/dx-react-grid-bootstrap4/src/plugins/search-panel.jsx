import { withComponents } from '@devexpress/dx-react-core';
import { SearchPanel as SearchPanelBase } from '@devexpress/dx-react-grid';
import { SearchPanelInput as Input } from '../templates/search-panel-input';

export const SearchPanel = withComponents({ Input })(SearchPanelBase);
