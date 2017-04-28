import {
  combineTemplates,
} from './templateHelpers';

describe('combineTemplates', () => {
  test('uses params and default template', () => {
    const userTemplate = (param) => {
      if (param === 0) {
        return 'a';
      }
      if (param === 1) {
        return 'b';
      }
      return undefined;
    };
    const defaultTemplate = param => param;

    const template = combineTemplates(userTemplate, defaultTemplate);
    expect(template(0)).toBe('a');
    expect(template(1)).toBe('b');
    expect(template(3)).toBe(3);
  });
  test('should treat null as valid user template output', () => {
    const userTemplate = () => null;
    const defaultTemplate = () => 'a';

    const template = combineTemplates(userTemplate, defaultTemplate);
    expect(template()).toBe(null);
  });
  test('should use default template if user template is undefined', () => {
    const defaultTemplate = () => 'a';

    const template = combineTemplates(undefined, defaultTemplate);
    expect(template()).toBe('a');
  });
});
