import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import moment from 'moment';
import { Layout } from './layout';

describe('AppointmentForm basic', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    dateTimeEditorComponent: () => null,
    recurrenceSwitcherComponent: () => null,
    labelComponent: () => null,
    allDayComponent: () => null,
    getMessage: jest.fn(),
    onAppointmentFieldChange: jest.fn(),
    changedAppointment: {},
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout><div /></Layout>);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should pass style to the root element', () => {
      const tree = shallow((
        <Layout style={{ tag: 'test' }} {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().style)
        .toMatchObject({
          tag: 'test',
        });
    });

    it('should override width style', () => {
      const tree = shallow((
        <Layout style={{ width: 100 }} {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().style)
        .toMatchObject({
          width: 100,
        });
    });

    it('should have style with width equal to 100% if appointment is basic', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().style)
        .toMatchObject({
          width: '100%',
        });
    });

    it('should have style with width equal to 65% if appointment is recurrent', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
          changedAppointment={{
            rRule: 'test rule',
          }}
        >
          <div />
        </Layout>
      ));

      expect(tree.props().style)
        .toMatchObject({
          width: '65%',
        });
    });

    it('should render components correctly if appointment is not recurrent', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.find(defaultProps.labelComponent))
        .toHaveLength(3);
      expect(tree.find(defaultProps.textEditorComponent))
        .toHaveLength(3);
      expect(tree.find(defaultProps.allDayComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.dateTimeEditorComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.dateTimeEditorComponent))
        .toHaveLength(1);
    });

    it('should render components correctly if appointment is recurrent', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
          changedAppointment={{
            rRule: 'test rule',
          }}
        >
          <div />
        </Layout>
      ));

      expect(tree.find(defaultProps.labelComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.textEditorComponent))
        .toHaveLength(3);
      expect(tree.find(defaultProps.allDayComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.dateTimeEditorComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.recurrenceSwitcherComponent))
        .toHaveLength(0);
    });

    it('should call getMessage with correct parameters', () => {
      shallow((
        <Layout
          {...defaultProps}
        >
          <div />
        </Layout>
      ));

      expect(defaultProps.getMessage)
        .toBeCalledWith('detailsLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('titleLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('moreInformationLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('additionalInformationLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('notesLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('allDayLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('repeatLabel');
    });

    it('should call onAppointmentFieldChange with correct parameters', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
        >
          <div />
        </Layout>
      ));

      const textEditors = tree.find(defaultProps.textEditorComponent);

      textEditors.at(0).simulate('valueChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            title: 'abc',
          },
        });

      textEditors.at(1).simulate('valueChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            additionalInformation: 'abc',
          },
        });

      textEditors.at(2).simulate('valueChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            notes: 'abc',
          },
        });

      const dateTimeEditor = tree.find(defaultProps.dateTimeEditorComponent);
      const testDate = new Date(2019, 1, 1, 1, 1);

      dateTimeEditor.at(0).simulate('firstDateValueChange', moment(testDate));
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            startDate: testDate,
          },
        });

      dateTimeEditor.at(0).simulate('secondDateValueChange', moment(testDate));
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            endDate: testDate,
          },
        });

      const allDayComponent = tree.find(defaultProps.allDayComponent);

      allDayComponent.at(0).simulate('valueChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toBeCalledWith({
          change: {
            allDay: 'abc',
          },
        });
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
          <div />
        </Layout>
      ));

      expect(tree.children())
        .toHaveLength(11);
    });
  });
});
