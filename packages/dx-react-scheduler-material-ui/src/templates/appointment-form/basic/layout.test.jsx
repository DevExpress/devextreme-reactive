import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { TITLE, TITLE_TEXT_EDITOR, MULTILINE_TEXT_EDITOR } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
  getFrequencyString: jest.fn(),
}));

describe('AppointmentForm basic', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    dateEditorComponent: () => null,
    labelComponent: () => null,
    booleanEditorComponent: () => null,
    selectComponent: () => null,
    resourceEditorComponent: () => null,
    getMessage: jest.fn(),
    onFieldChange: jest.fn(),
    appointmentData: {},
    locale: 'en-US',
    fullSize: false,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should have width equal to 100% if it is full-size', () => {
      const tree = shallow((
        <Layout {...defaultProps} fullSize />
      ));

      expect(tree.is(`.${classes.fullSize}`))
        .toBeTruthy();
    });

    it('should render components correctly if appointment is not recurrent', () => {
      const tree = shallow((
        <Layout {...defaultProps} fullSize />
      ));

      const labelComponents = tree.find(defaultProps.labelComponent);
      expect(labelComponents)
        .toHaveLength(3);
      expect(labelComponents.at(0).prop('type'))
        .toEqual(TITLE);
      expect(labelComponents.at(1).is(`.${classes.dividerLabel}`))
        .toBeTruthy();
      expect(labelComponents.at(2).prop('type'))
        .toEqual(TITLE);
      expect(labelComponents.at(2).is(`.${classes.labelWithMargins}`))
        .toBeTruthy();

      const textEditors = tree.find(defaultProps.textEditorComponent);
      expect(textEditors)
        .toHaveLength(2);
      expect(textEditors.at(0).prop('type'))
        .toEqual(TITLE_TEXT_EDITOR);
      expect(textEditors.at(1).prop('type'))
        .toEqual(MULTILINE_TEXT_EDITOR);
      expect(textEditors.at(1).is(`.${classes.notesEditor}`))
        .toBeTruthy();

      expect(tree.find(defaultProps.booleanEditorComponent))
        .toHaveLength(2);

      const dateEditors = tree.find(defaultProps.dateEditorComponent);
      expect(dateEditors)
        .toHaveLength(2);
      expect(dateEditors.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
      expect(dateEditors.at(1).is(`.${classes.dateEditor}`))
        .toBeTruthy();

      expect(tree.find(`.${classes.dateEditors}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.booleanEditors}`))
        .toHaveLength(1);
    });

    it('should call getMessage with correct parameters', () => {
      shallow((
        <Layout {...defaultProps} fullSize />
      ));

      expect(defaultProps.getMessage)
        .toBeCalledWith('detailsLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('titleLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('moreInformationLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('notesLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('allDayLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('repeatLabel');
    });

    it('should call onFieldChange with correct parameters', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const textEditors = tree.find(defaultProps.textEditorComponent);

      textEditors.at(0).simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toBeCalledWith({ title: 'abc' });
      textEditors.at(1).simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toBeCalledWith({ notes: 'abc' });

      const dateEditors = tree.find(defaultProps.dateEditorComponent);

      dateEditors.at(0).simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toBeCalledWith({ startDate: 'abc' });
      dateEditors.at(1).simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toBeCalledWith({ endDate: 'abc' });

      const booleanEditorComponent = tree.find(defaultProps.booleanEditorComponent);

      booleanEditorComponent.at(0).simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toBeCalledWith({ allDay: 'abc' });
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div className="child" />
        </Layout>
      ));

      expect(tree.find('.child'))
        .toBeTruthy();
    });

    it('should render resource editor components', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
          resources={[{}, {}]}
        />
      ));

      expect(tree.find(defaultProps.resourceEditorComponent))
        .toHaveLength(2);
    });
  });
});
