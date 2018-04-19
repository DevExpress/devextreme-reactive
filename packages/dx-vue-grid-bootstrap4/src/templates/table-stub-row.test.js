import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { TableStubRow } from './table-stub-row';

describe('TableStubRow', () => {
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
          <TableStubRow>
            <div class="content" />
          </TableStubRow>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
