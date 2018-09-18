import { LineSeries } from '@devexpress/dx-react-chart';
import { withClassName } from '../utils';

export const Path = withClassName('dx-c-bs4-fill-none', 'dx-c-bs4-series-path')(LineSeries.Path);
