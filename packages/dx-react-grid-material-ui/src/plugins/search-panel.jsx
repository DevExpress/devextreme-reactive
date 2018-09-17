import { SearchPanel as SearchPanelBase, withComponents } from '@devexpress/dx-react-grid';
import { SearchPanelInput as Input } from '../templates/search-panel-input';

export const SearchPanel = withComponents({ Input })(SearchPanelBase);
