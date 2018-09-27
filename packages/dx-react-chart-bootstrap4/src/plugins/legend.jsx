import { Legend as LegendBase, withComponents } from '@devexpress/dx-react-chart';
import { Root } from '../templates/legend/root';
import { Label } from '../templates/legend/label';
import { Item } from '../templates/legend/item';

export const Legend = withComponents({
  Root, Item, Label,
})(LegendBase);
