// tslint:disable: max-line-length
import { getColumnExtensionValueGetter } from './column-extension';

describe('getColumnExtensionValue', () => {
  it('should return default value by default', () => {
    const value = getColumnExtensionValueGetter(undefined, undefined, 'defaultExtValue')();
    expect(value).toBe('defaultExtValue');
  });

  it('should return extension value if it does not equal to default value', () => {
    const extensions = [{ columnName: 'columnName', extName: 'extValue' }];
    const value = getColumnExtensionValueGetter(extensions, 'extName', 'defaultExtValue')('columnName');
    expect(value).toBe('extValue');
  });

  it('should return default value if extension value is not defined', () => {
    const extensions = [{ columnName: 'columnName' }];
    const value = getColumnExtensionValueGetter(extensions, 'unknownExtName', 'defaultExtValue')('columnName');
    expect(value).toBe('defaultExtValue');
  });
});
