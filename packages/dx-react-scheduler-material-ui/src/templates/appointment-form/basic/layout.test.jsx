import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TITLE_LABEL, TITLE_TEXT_EDITOR, MULTILINE_TEXT_EDITOR } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
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
    getMessage: jest.fn(),
    onFieldChange: jest.fn(),
    appointmentData: {},
    locale: 'en-US',
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

    it('should have width equal to 100% if appointment is basic', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.is(`.${classes.fullSize}`))
        .toBeTruthy();
    });

    it('should render components correctly if appointment is not recurrent', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      const labelComponents = tree.find(defaultProps.labelComponent);
      expect(labelComponents)
        .toHaveLength(4);
      expect(labelComponents.at(0).prop('type'))
        .toEqual(TITLE_LABEL);
      expect(labelComponents.at(1).is(`.${classes.dividerLabel}`))
        .toBeTruthy();
      expect(labelComponents.at(2).prop('type'))
        .toEqual(TITLE_LABEL);
      expect(labelComponents.at(2).is(`.${classes.labelWithMargins}`))
        .toBeTruthy();
      expect(labelComponents.at(3).prop('type'))
        .toEqual(TITLE_LABEL);
      expect(labelComponents.at(3).is(`.${classes.labelWithMargins}`))
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
        .toHaveLength(1);

      const dateEditors = tree.find(defaultProps.dateEditorComponent);
      expect(dateEditors)
        .toHaveLength(2);
      expect(dateEditors.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
      expect(dateEditors.at(1).is(`.${classes.dateEditor}`))
        .toBeTruthy();

      expect(tree.find(defaultProps.selectComponent))
        .toHaveLength(1);

      expect(tree.find(`.${classes.dateEditors}`))
        .toHaveLength(1);
    });

    it('should render components correctly if appointment is recurrent', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
          appointmentData={{
            rRule: 'test rule',
          }}
        >
          <div />
        </Layout>
      ));

      expect(tree.find(defaultProps.labelComponent))
        .toHaveLength(3);
      expect(tree.find(defaultProps.textEditorComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.booleanEditorComponent))
        .toHaveLength(1);
      expect(tree.find(defaultProps.dateEditorComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.selectComponent))
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
        .toBeCalledWith('notesLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('allDayLabel');
      expect(defaultProps.getMessage)
        .toBeCalledWith('repeatLabel');
    });

    it('should call onFieldChange with correct parameters', () => {
      const tree = shallow((
        <Layout
          {...defaultProps}
        >
          <div />
        </Layout>
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
  });
});
