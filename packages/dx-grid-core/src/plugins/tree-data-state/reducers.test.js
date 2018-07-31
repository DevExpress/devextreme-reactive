import { toggleRowExpanded } from './reducers';
import { toggle } from '../../utils/common-reducers';

jest.mock('../../utils/common-reducers', () => ({
  toggle: jest.fn(),
}));

describe('TreeDataState Plugin reducers', () => {
  describe('#toggleRowExpanded', () => {
    it('uses common toggle reducer', () => {
      toggleRowExpanded([], { rowId: 1, state: false });

      expect(toggle)
        .toHaveBeenLastCalledWith([], [1], false);
    });
  });
});
