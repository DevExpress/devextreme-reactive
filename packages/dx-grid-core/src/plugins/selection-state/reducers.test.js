import { toggleSelection } from './reducers';
import { toggle } from '../../utils/common-reducers';

jest.mock('../../utils/common-reducers', () => ({
  toggle: jest.fn(),
}));

describe('SelectionState Plugin reducers', () => {
  describe('#toggleSelection', () => {
    it('uses common toggle reducer', () => {
      toggleSelection([], { rowIds: [1], state: false });

      expect(toggle)
        .toHaveBeenLastCalledWith([], [1], false);
    });
  });
});
