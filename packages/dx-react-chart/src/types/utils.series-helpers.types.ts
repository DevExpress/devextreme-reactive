import {
  GetPointTransformerFn, CreateHitTesterFn,
} from './index';

/** @internal */
export type Components = {
  Path: any,
  Point?: any,
};
/** @internal */
export type ExtraSeriesParameters = {
  components: Components,
  getPointTransformer: GetPointTransformerFn,
  createHitTester: CreateHitTesterFn,
};
