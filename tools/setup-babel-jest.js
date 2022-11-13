import { createTransformer } from 'babel-jest';

export default createTransformer({
  rootMode: 'upward-optional',
});
