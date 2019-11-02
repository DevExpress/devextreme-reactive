import {
  ConvertResourcesToPlain, ValidateResources, ValidResourceItem,
} from '../../types';

export const convertResourcesToPlain: ConvertResourcesToPlain = (validResources) => {
  return validResources.reduce((acc, resource) => [
    ...acc,
    ...resource.items.map(item => item),
  ], [] as Array<ValidResourceItem>);
};

export const validateResources: ValidateResources = (resources, mainResourceName, palette) => {
  const isMainResourceDefined = !!mainResourceName;
  let currentPaletteIndex = 0;
  return resources.map((resource, groupIndex) => {
    const fieldName = resource.fieldName;
    const isMain = isMainResourceDefined && mainResourceName === fieldName
      || groupIndex === 0 && !isMainResourceDefined;
    const title = resource.title || fieldName;
    const allowMultiple = !!resource.allowMultiple;
    return {
      fieldName,
      isMain,
      title,
      allowMultiple,
      items: resource.items.map((resourceItem) => {
        const color = resourceItem.color || palette[currentPaletteIndex];
        if (!resourceItem.color) currentPaletteIndex += 1;

        return ({
          id: resourceItem.id,
          color,
          fieldName,
          text: resourceItem.text || title || fieldName,
          title,
          allowMultiple,
          isMain,
        });
      }),
    };
  });
};
