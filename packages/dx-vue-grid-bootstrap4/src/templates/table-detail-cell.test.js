import { shallow } from '@vue/test-utils';
import { TableDetailCell } from './table-detail-cell';

describe('TableDetailCell', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <TableDetailCell>
            <div class="content" />
          </TableDetailCell>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
