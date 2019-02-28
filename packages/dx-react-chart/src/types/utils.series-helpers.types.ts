import {
  GetPointTransformerFn, CreateHitTesterFn,
} from './index';

/** @internal */
export type Components = {
  readonly Path: React.ComponentType<any>,
  readonly Point?: React.ComponentType<any>,
};
/** @internal */
export type ExtraSeriesParameters = {
  components: Components,
  getPointTransformer: GetPointTransformerFn,
  createHitTester: CreateHitTesterFn,
};
