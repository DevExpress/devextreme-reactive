import { AttachResources, AttachResourcesComputed, ConvertResourcesToPlane } from '../../types';

// TODO: move to helpers
const convertResourcesToPlane: ConvertResourcesToPlane = (resources, mainResourceName) => {
  let isMainGlobal = false;
  const planeResources = resources.reduce((acc, resource) => {
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
    planeResources[0].isMain = true;
  }

  return planeResources;
};

export const attachResourcesBase: AttachResourcesComputed = (
  appointments, resources, mainResourceName,
) => appointments.map(appointment => attachResources(appointment, resources, mainResourceName));

export const attachResources: AttachResources = (
  appointment, resources, mainResourceName,
) => {
  const planeResources = convertResourcesToPlane(resources, mainResourceName);

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
          ...appointmentResourceId.map(resourceItemId => planeResources.filter(resourceItem => resourceItem.id === resourceItemId && resource.fieldName === resourceItem.fieldName)[0]),
        ];
      }
      // number
      return [
        ...acc,
        ...planeResources.filter(resourceItem => resourceItem.id === appointmentResourceId && resource.fieldName === resourceItem.fieldName),
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
