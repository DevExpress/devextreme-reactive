import { WeekViewProps, BasicViewProps } from './index';

/** @internal */
export type CommonVerticalViewProps = WeekViewProps
  & Pick<BasicViewProps, 'viewCellsDataComputed' | 'type'>
