import { getColumnExtensionValue } from './column';

describe('getColumnExtensionValue', () => {
  it('should return default value by default', () => {
    const value = getColumnExtensionValue(undefined, undefined, 'defaultExtValue')();
    expect(value).toBe('defaultExtValue');
  });

  it('should return extension value if it does not equal to default value', () => {
    const extensions = [{ columnName: 'columnName', extName: 'extValue' }];
    const value = getColumnExtensionValue(extensions, 'extName', 'defaultExtValue')('columnName');
    expect(value).toBe('extValue');
  });

  it('should return default value if extension value is not defined', () => {
    const extensions = [{ columnName: 'columnName' }];
    const value = getColumnExtensionValue(extensions, 'unknownExtName', 'defaultExtValue')('columnName');
    expect(value).toBe('defaultExtValue');
  });
});
