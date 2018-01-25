import * as React from 'react';
import {
  PagingPanelContainerProps,
} from '@devexpress/dx-react-grid';

export interface PagingPanelProps {
  /** A component that renders the paging panel. */
  containerComponent?: React.ComponentType<PagingPanelContainerProps>;
  /** The page sizes that a user can select. */
  pageSizes: Array<number>;
  /** An object that specifies the localization messages. */
  messages?: object;
}

interface PagingPanelComponentType extends React.ComponentClass<PagingPanelProps> {
  Container:  React.ComponentType<PagingPanelContainerProps>;
}

export declare const PagingPanel: PagingPanelComponentType;
