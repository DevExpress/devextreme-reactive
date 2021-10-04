import { Getters } from '@devexpress/dx-react-core';
import { LegendItemList } from './index';

// tslint:disable-next-line: no-namespace
export namespace Legend {
  /** Describes properties passed to a component that renders the labe */
  export interface LabelProps {
    /** Item text */
    text: string | number;
  }
  /** Describes properties passed to a component that renders the legend’s root layout */
  export interface RootProps {
    /** A React node used to render the legend’s root layout */
    children: React.ReactNode;
    /** @internal */
    name: string;
  }
  /** Describes properties passed to a component that renders a legend item */
  export interface ItemProps {
    /** A React node used to render an item */
    children: React.ReactNode;
  }

  export interface MarkerProps {
    /** @internal */
    color?: string;
    /** @internal */
    name?: string;
    [key: string]: unknown;
  }
}
export interface LegendProps {
  /** The legend position */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** @internal */
  getItems?: ({ series }: Getters) => LegendItemList;
  /** A component that renders a marker */
  markerComponent: React.ComponentType<Legend.MarkerProps>;
  /** A component that renders the legend label */
  labelComponent: React.ComponentType<Legend.LabelProps>;
  /** A component that renders the legend’s root layout */
  rootComponent: React.ComponentType<Legend.RootProps>;
  /** A component that renders a legend item */
  itemComponent: React.ComponentType<Legend.ItemProps>;
}
