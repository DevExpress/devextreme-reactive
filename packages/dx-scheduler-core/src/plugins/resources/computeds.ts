import { AttachResources, AttachResourcesComputed, convertResourcesToPlain } from '../../types';

// TODO: move to helpers
const convertResourcesToPlain: convertResourcesToPlain = (resources, mainResourceName) => {
  let isMainGlobal = false;
  const plainResources = resources.reduce((acc, resource) => {
    const isMain = !(mainResourceName !== resource.fieldName);
    isMainGlobal = isMainGlobal || isMain;
    return [
      ...acc,
      ...resource.items.map(item => ({
        ...item,
        fieldName: resource.fieldName,
        title: resource.title || resource.fieldName,
        allowMultiple: !!resource.allowMultiple,
        isMain,
      })),
    ];
  }, []);

  if (!isMainGlobal) {
    plainResources[0].isMain = true;
  }

  return plainResources;
};

export const attachResourcesBase: AttachResourcesComputed = (
  appointments, resources, mainResourceName,
) => appointments.map(appointment => attachResources(appointment, resources, mainResourceName));

export const attachResources: AttachResources = (
  appointment, resources, mainResourceName,
) => {
  const plainResources = convertResourcesToPlain(resources, mainResourceName);

  debugger
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
