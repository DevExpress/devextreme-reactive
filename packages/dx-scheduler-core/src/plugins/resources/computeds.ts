import { AttachResources, AttachResourcesComputed, convertResourcesToPlain } from '../../types';

// TODO: move to helpers
const convertResourcesToPlain: convertResourcesToPlain = (resources, mainResourceName, palette) => {
  const isMainResourceDefined = !!mainResourceName;
  let currentPaletteIndex = 0;
  const plainResources = resources.reduce((acc, resource, groupIndex) => {
    const isMain = isMainResourceDefined && !(mainResourceName !== resource.fieldName)
      || groupIndex === 0; // TODO: add test!
    return [
      ...acc,
      ...resource.items.map((item) => {
        let color = item.color;
        if (!item.color) {
          color = palette[currentPaletteIndex];
          currentPaletteIndex += 1;
        }
        return ({
          ...item,
          color,
          fieldName: resource.fieldName,
          title: resource.title || resource.fieldName,
          allowMultiple: !!resource.allowMultiple,
          isMain,
        });
      }),
    ];
  }, []);

  return plainResources;
};

export const attachResourcesBase: AttachResourcesComputed = (
  appointments, resources, mainResourceName, palette,
) => {
  if (resources.length > 0) {
    return appointments.map(appointment => attachResources(appointment, resources, mainResourceName, palette));
  } return appointments;
};

export const attachResources: AttachResources = (
  appointment, resources, mainResourceName, palette,
) => {
  const plainResources = convertResourcesToPlain(resources, mainResourceName, palette);

  const appointmentResources = resources.reduce((acc, resource) => {
    const appointmentResourceId = appointment.dataItem[resource.fieldName];
    if (appointmentResourceId !== undefined) {
      // Array<number>
      if (resource.allowMultiple && !Array.isArray(appointmentResourceId)
      || !resource.allowMultiple && Array.isArray(appointmentResourceId)) {
        // error
        return acc;
      }
      if (resource.allowMultiple) {
        return [
          ...acc,
          ...appointmentResourceId.map(resourceItemId => plainResources.filter(resourceItem => resourceItem.id === resourceItemId && resource.fieldName === resourceItem.fieldName)[0]),
        ];
      }
      // number
      return [
        ...acc,
        ...plainResources.filter(resourceItem => resourceItem.id === appointmentResourceId && resource.fieldName === resourceItem.fieldName),
      ];
    }
    return acc;
  }, []);

  return {
    ...appointment,
    ...appointmentResources.length > 0 && {
      resources: appointmentResources,
    },
  };
};
