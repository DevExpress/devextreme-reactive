import { Getters } from '@devexpress/dx-react-core';
import { LegendItemList } from './index';
import { MarkerProps } from './templates.legend.types';

interface LabelProps {
  // Item text
  text: string|number;
}
interface RootProps {
  children: React.ReactNode;
  /** @internal */
  name: string;
}
interface ItemProps {
  children: React.ReactNode;
}
export interface RawLegendProps {
  // The legend position
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** @internal */
  getItems?: ({ series }: Getters) => LegendItemList;
  // A component that renders a marker
  markerComponent: React.ComponentType<MarkerProps>;
  // A component that renders the legend label
  labelComponent: React.ComponentType<LabelProps>;
  // A component that renders the legend’s root layout
  rootComponent: React.ComponentType<RootProps>;
  // A component that renders a legend item
  itemComponent: React.ComponentType<ItemProps>;
}
