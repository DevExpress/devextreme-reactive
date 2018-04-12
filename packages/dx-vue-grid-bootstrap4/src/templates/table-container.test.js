import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { TableContainer } from './table-container';

describe('TableContainer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <TableContainer>
            <div class="content" />
          </TableContainer>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
