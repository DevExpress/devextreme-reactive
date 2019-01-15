import * as React from 'react';
import { DragDropProviderCore } from './provider';

/** @internal */
export const DragDropContext = React.createContext<DragDropProviderCore | null>(null);
