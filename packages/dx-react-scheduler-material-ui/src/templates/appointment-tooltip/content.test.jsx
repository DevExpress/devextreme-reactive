import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { viewBoundText } from '@devexpress/dx-scheduler-core';
import { Content } from './content';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  viewBoundText: jest.fn(),
}));

jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  makeStyles: jest.fn(() => () => ({
    content: 'content',
    text: 'text',
    title: 'title',
    icon: 'icon',
    lens: 'lens',
    lensMini: 'lensMini',
    textCenter: 'textCenter',
    dateAndTitle: 'dateAndTitle',
    titleContainer: 'titleContainer',
    contentContainer: 'contentContainer',
    resourceContainer: 'resourceContainer',
    recurringIcon: 'recurringIcon',
    relativeContainer: 'relativeContainer',
  })),
}));

describe('Appointment Tooltip', () => {
  let shallow;
  const defaultProps = {
    appointmentData: {
      startDate: new Date('2018-08-17 10:00'),
      endDate: new Date('2018-08-17 11:00'),
      title: 'title',
    },
    formatDate: jest.fn(),
    recurringIconComponent: jest.fn(),
  };
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    jest.resetAllMocks();
    viewBoundText.mockImplementation(() => 'viewBoundText');
  });
  describe('Content', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Content className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.content'))
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

      expect(tree.find('.titleContainer').exists())
        .toBeTruthy();
      expect(tree.find('.lens').exists())
        .toBeTruthy();
      expect(tree.find('.recurringIcon').exists())
        .toBeFalsy();
      expect(tree.find('.title').exists())
        .toBeTruthy();
      expect(tree.find('.icon').exists())
        .toBeTruthy();
      expect(tree.find('.text'))
        .toHaveLength(2);
      expect(tree.find('.dateAndTitle'))
        .toHaveLength(2);
      expect(tree.find('.textCenter'))
        .toBeTruthy();
      expect(tree.find('.relativeContainer').exists())
        .toBeTruthy();
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
        .toHaveBeenCalledTimes(2);
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(defaultProps.appointmentData.startDate, { hour: 'numeric', minute: 'numeric' });
      expect(defaultProps.formatDate)
        .toHaveBeenCalledWith(defaultProps.appointmentData.endDate, { hour: 'numeric', minute: 'numeric' });
    });

    it('should call viewBoundText with proper parameters', () => {
      shallow((
        <Content {...defaultProps} />
      ));

      expect(viewBoundText)
        .toHaveBeenCalledWith(
          defaultProps.appointmentData.startDate,
          defaultProps.appointmentData.endDate, 'weekdayInterval',
          defaultProps.appointmentData.startDate, 1,
          defaultProps.formatDate,
        );
    });

    it('should render recurring icon if the appointment is recurring', () => {
      const tree = shallow((
        <Content {...defaultProps} appointmentData={{ ...defaultProps.appointmentData, rRule: 'test' }} />
      ));

      expect(tree.find('.recurringIcon').exists())
        .toBeTruthy();
    });

    it('should render resource instances', () => {
      const appointmentResources = [
        { id: 0, text: 'text-0', color: 'red' },
        { id: 1, text: 'text-1', color: 'blue' },
      ];
      const tree = shallow((
        <Content {...defaultProps} appointmentResources={appointmentResources} />
      ));

      expect(tree.find('.resourceContainer'))
        .toHaveLength(2);
    });
  });
});
