import * as series from './plugins/series-with-components';

export { Chart } from './chart';
export { Legend } from './plugins/legend';
export { Title } from './plugins/title';

export { Scale } from './plugins/scale';
export { Stack } from './plugins/stack';

// For convenience purpose - so that all series can be obtained without explicit named enumeration.
// Used in "bootstrap4" and "material-ui" packages where series components are replaced.
export { series };
export * from './plugins/series-with-components';
export * from './templates/series';

export { Axis } from './plugins/axis';
export { Grid } from './plugins/grid';

export { batchBindSeriesComponents, patchProps } from './utils';
