import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Content } from './content';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    appointmentData: {
      startDate: new Date('2018-08-17 10:00'),
      endDate: new Date('2018-08-17 11:00'),
      title: 'title',
    },
    formatDate: jest.fn(),
  };
  beforeAll(() => {
    classes = getClasses(<Content />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('Content', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Content className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.content}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Content data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its element correctly', () => {
      const tree = shallow((
        <Content {...defaultProps} />
      ));

      expect(tree.find(`.${classes.titleContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.circle}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.title}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.icon}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.text}`))
        .toHaveLength(2);
      expect(tree.find(`.${classes.dateAndTitle}`))
        .toHaveLength(2);
      expect(tree.find(`.${classes.textCenter}`))
        .toHaveLength(2);
    });

    it('should render children', () => {
      const tree = shallow((
        <Content {...defaultProps}>
          <div className="inner-content" />
        </Content>
      ));

      expect(tree.find('.inner-content').exists()).toBeTruthy();
    });

    it('should call format date with proper parameters', () => {
      shallow((
        <Content {...defaultProps} />
      ));

      expect(defaultProps.formatDate)
        .toHaveBeenCalledTimes(3);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(defaultProps.appointmentData.startDate, { day: 'numeric', weekday: 'long' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(defaultProps.appointmentData.startDate, { hour: 'numeric', minute: 'numeric' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(defaultProps.appointmentData.endDate, { hour: 'numeric', minute: 'numeric' });
    });

    it('should call format date with proper parameters when start day if different from end day', () => {
      const appointmentData = {
        startDate: new Date('2018-08-15 10:00'),
        endDate: new Date('2018-08-17 11:00'),
        title: 'title',
      };
      shallow((
        <Content {...defaultProps} appointmentData={appointmentData} />
      ));

      expect(defaultProps.formatDate)
        .toHaveBeenCalledTimes(4);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(appointmentData.startDate, { day: 'numeric', weekday: 'long' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(appointmentData.endDate, { day: 'numeric', weekday: 'long' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' });
    });
  });
});
