import {
  GetPointTransformerFn, CreateHitTesterFn,
} from './index';
import { RawPointProps, PathProps } from './templates.series.types';

export type ComponentProps = {
  name?: string,
  scaleName?: string,
  seriesComponent: React.ComponentType<PathProps>,
  pointComponent?: React.ComponentType<RawPointProps>,
  color?: string,
  valueField: string,
  argumentField: string,
};
export type Components = {
  Path: any,
  Point?: any,
};

export type ExtraSeriesParameters = {
  components: Components,
  getPointTransformer: GetPointTransformerFn,
  createHitTester: CreateHitTesterFn,
};
