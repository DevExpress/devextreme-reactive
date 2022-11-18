/* globals Element */
// tslint:disable-next-line
import PropTypes from 'prop-types';

/** @internal */
export const RefType = PropTypes.shape({
  current: PropTypes.instanceOf((typeof Element !== 'undefined') ? Element : Object),
});
