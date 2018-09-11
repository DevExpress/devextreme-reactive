import * as series from './plugins/series';

export { Chart } from './chart';
export { Legend } from './plugins/legend';
export { Title } from './plugins/title';

export { Scale } from './plugins/scale';
export { Stack } from './plugins/stack';

// For convenience purpose - so later all series can be patched
export { series };
export * from './plugins/series';
export * from './templates/series';

export { Axis } from './plugins/axis';
export { Grid } from './plugins/grid';

export { batchBindSeriesComponents, patchProps  } from './utils';
