import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { TableRow } from './table-row';

describe('TableRow', () => {
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
          <TableRow>
            <div class="content" />
          </TableRow>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
