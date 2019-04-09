import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { VerticalAppointment } from './vertical-appointment';

describe('VerticalAppointment', () => {
  const defaultProps = {
    data: {
      title: 'title',
      startDate: new Date('2018-07-27 13:10'),
      endDate: new Date('2018-07-27 17:10'),
    },
    recurringIconComponent: () => <div />,
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<VerticalAppointment {...defaultProps} />);
    mount = createMount({ dive: true });
  });
  describe('VerticalAppointment', () => {
    it('should render title', () => {
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should render appointment times', () => {
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
        />
      ));

      expect(tree.find(`.${classes.time}`).at(0).text())
        .toBe('1:10 PM');
      expect(tree.find(`.${classes.time}`).at(1).text())
        .toBe(' - ');
      expect(tree.find(`.${classes.time}`).at(2).text())
        .toBe('5:10 PM');
    });

    it('should render children', () => {
      const child = mount((
        <VerticalAppointment
          {...defaultProps}
        >
          <div className="child" />
        </VerticalAppointment>
      )).find('.child');

      expect(child.exists())
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} customData={{ a: 1 }} />
      ));

      expect(tree.props().customData)
        .toMatchObject({ a: 1 });
    });

    it('should render icon if appointment is recurring', () => {
      const data = {
        title: 'title',
        startDate: new Date('2018-07-27 13:10'),
        endDate: new Date('2018-07-27 17:10'),
        rRule: 'FREQ=DAILY;COUNT=6',
      };
      let tree = mount((
        <VerticalAppointment {...defaultProps} data={data} />
      ));

      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeTruthy();

      tree = mount((
        <VerticalAppointment {...defaultProps} />
      ));
      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeFalsy();
    });
  });
});
