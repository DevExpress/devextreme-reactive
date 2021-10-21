import * as React from 'react';
import { createMount, getClasses } from '@devexpress/dx-testing';
import { HorizontalAppointment } from './horizontal-appointment';

describe('HorizontalAppointment', () => {
  const defaultProps = {
    data: {
      title: 'title',
    },
    recurringIconComponent: () => <div />,
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<HorizontalAppointment {...defaultProps} />);
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  describe('HorizontalAppointment', () => {
    it('should render title', () => {
      const tree = mount((
        <HorizontalAppointment
          {...defaultProps}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should render children', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps}>
          <div className="child" />
        </HorizontalAppointment>
      ));

      expect(tree.exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps} customData={{ a: 1 }} />
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
      const tree = mount((
        <HorizontalAppointment {...defaultProps} data={data} />
      ));

      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.recurringContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.container}`).exists())
        .toBeFalsy();
    });

    it('should not render recurring icon if appointment is simple', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps} />
      ));

      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeFalsy();
      expect(tree.find(`.${classes.recurringContainer}`).exists())
        .toBeFalsy();
      expect(tree.find(`.${classes.container}`).exists())
        .toBeTruthy();
    });
  });
});
