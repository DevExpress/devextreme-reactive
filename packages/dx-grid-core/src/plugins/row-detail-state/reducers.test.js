import { toggleDetailRowExpanded } from './reducers';
import { toggle } from '../../utils/common-reducers';

jest.mock('../../utils/common-reducers', () => ({
  toggle: jest.fn(),
}));

describe('TableRowDetail Plugin reducers', () => {
  describe('#toggleDetailRowExpanded', () => {
    it('uses common toggle reducer', () => {
      toggleDetailRowExpanded([], { rowId: 1, state: false });

      expect(toggle)
        .toHaveBeenLastCalledWith([], [1], false);
    });
  });
});
