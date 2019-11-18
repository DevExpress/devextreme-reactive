import {
  ConvertResourcesToPlain, ValidateResources, ValidResourceInstance,
} from '../../types';

export const convertResourcesToPlain: ConvertResourcesToPlain = (validResources) => {
  return validResources.reduce((acc, resource) => [
    ...acc,
    ...resource.instances.map(item => item),
  ], [] as Array<ValidResourceInstance>);
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
      instances: resource.instances.map((resourceItem) => {
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
