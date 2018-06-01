import { mount } from '@vue/test-utils';
import { Item } from './item';


describe('Item', () => {
  it('should mark checkbox as checked if "hidden" property is false', () => {
    const tree = mount({
      render() {
        return (
          <Item
            item={{
              column: { name: 'a', title: 'A' },
              hidden: false,
            }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(true);
  });

  it('shouldn\'t mark checkbox as checked if "hidden" property is true', () => {
    const tree = mount({
      render() {
        return (
          <Item
            item={{
              column: { name: 'a', title: 'A' },
              hidden: true,
            }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(false);
  });

  // it('should call the "onToggle" on the checkbox "onChange" event', () => {
  //   const toggleHandler = jest.fn();
  //   const tree = shallow((
  //     <Item
  //       {...defaultProps}
  //       onToggle={toggleHandler}
  //     />
  //   ));

  //   tree.find('input[type="checkbox"]')
  //     .first()
  //     .prop('onChange')('a');

  //   expect(toggleHandler)
  //     .toHaveBeenCalledTimes(1);
  // });

  // it('should call the "onToggle" on the list item "onClick" event', () => {
  //   const toggleHandler = jest.fn();
  //   const tree = shallow({
  //     render() {
  //       return (
  //         <Item
  //           onToggle={toggleHandler}
  //           {...{ attrs: { ...defaultProps } }}
  //         />
  //       );
  //     },
  //   });

  //   tree.find('button')
  //     .first()
  //     .prop('onClick')('a');

  //   expect(toggleHandler)
  //     .toHaveBeenCalledTimes(1);
  // });

  // it('should render column title or name in each item', () => {
  //   const tree = shallow((
  //     <Item
  //       {...defaultProps}
  //     />
  //   ));

  //   expect(tree.find('button').text().trim())
  //     .toBe('A');

  //   tree.setProps({ item: { column: { name: 'b' } } });

  //   expect(tree.find('button').text().trim())
  //     .toBe('b');
  // });

  // it('should pass the className prop to the root element', () => {
  //   const tree = shallow((
  //     <Item
  //       {...defaultProps}
  //       className="custom-class"
  //     />
  //   ));

  //   expect(tree.is('.dropdown-item.custom-class.dx-g-bs4-column-chooser-item.dx-g-bs4-cursor-pointer'))
  //     .toBeTruthy();
  // });

  // it('should pass rest props to the root element', () => {
  //   const tree = shallow((
  //     <Item
  //       {...defaultProps}
  //       data={{ a: 1 }}
  //     />
  //   ));

  //   expect(tree.props().data)
  //     .toMatchObject({ a: 1 });
  // });

  // it('should process the disabled prop', () => {
  //   const tree = shallow((
  //     <Item
  //       {...defaultProps}
  //       disabled
  //     />
  //   ));
  //   expect(tree.find('button').prop('disabled'))
  //     .toBeTruthy();
  //   expect(tree.find('input[type="checkbox"]').prop('disabled'))
  //     .toBeTruthy();
  // });
});
