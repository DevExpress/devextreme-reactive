import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import {
  NUMBER_EDITOR,
  TITLE_TEXT_EDITOR,
  NOTES_TEXT_EDITOR,
} from '@devexpress/dx-scheduler-core';
import { TextEditor } from './text-editor';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('TextEditor', () => {
    it('should pass className to the root element', () => {
      const classes = getClasses(<TextEditor {...defaultProps} />);
      const tree = shallow((
        <TextEditor className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.editor}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TextEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render pass InputProps correctly', () => {
      let classes = getClasses(<TextEditor {...defaultProps} />);
      let tree = mount((
        <TextEditor {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      classes = getClasses(<TextEditor id={NUMBER_EDITOR} {...defaultProps} />);
      tree = mount((
        <TextEditor id={NUMBER_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      classes = getClasses(<TextEditor id={NOTES_TEXT_EDITOR} {...defaultProps} />);
      tree = mount((
        <TextEditor id={NOTES_TEXT_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeFalsy();

      classes = getClasses(<TextEditor id={TITLE_TEXT_EDITOR} {...defaultProps} />);
      tree = mount((
        <TextEditor id={TITLE_TEXT_EDITOR} {...defaultProps} />
      ));
      expect(tree.find(`.${classes.title}`).exists())
        .toBeTruthy();
    });

    it('should render ordinary editor correctly', () => {
      const tree = shallow((
        <TextEditor {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('text');
    });

    it('should render number editor correctly', () => {
      const tree = shallow((
        <TextEditor id={NUMBER_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('number');
    });

    it('should render notes editor correctly', () => {
      const tree = shallow((
        <TextEditor id={NOTES_TEXT_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('outlined');
      expect(tree.prop('multiline'))
        .toBeTruthy();
    });

    it('should render title editor correctly', () => {
      const tree = shallow((
        <TextEditor id={TITLE_TEXT_EDITOR} {...defaultProps} />
      ));

      expect(tree.prop('variant'))
        .toBe('filled');
      expect(tree.prop('multiline'))
        .toBeFalsy();
      expect(tree.prop('type'))
        .toEqual('text');
    });

    it('should CALL ONcHANGE WITH PROPER PARAMETER', () => {
      const tree = shallow((
        <TextEditor {...defaultProps} />
      ));

      tree.simulate('change', 'abc');
      expect(defaultProps.onChange)
        .toBeCalledWith('abc');
    });
  });
});
