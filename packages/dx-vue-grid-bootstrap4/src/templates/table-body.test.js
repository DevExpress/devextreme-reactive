import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { TableBody } from './table-body';

describe('TableBody', () => {
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
          <TableBody>
            <div class="content" />
          </TableBody>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
