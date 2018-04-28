import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxTable } from './table';

describe('DxTable', () => {
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
          <DxTable>
            <div class="content" />
          </DxTable>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
