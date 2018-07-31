import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { Table } from './table';

describe('Table', () => {
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
          <Table>
            <div class="content" />
          </Table>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
