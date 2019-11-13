import { Color as MUIColor } from '@material-ui/core';
import { PureComputed } from '@devexpress/dx-core';
import { Appointment } from './../index';

/* tslint:disable no-empty-interface */
/** Configures a resource. */
export type Resource = {
  /**
   * A data field name used to assign appointments to this resource.
   * This field should be present in appointment data objects.
   */
  fieldName: string;
  /** The resource title. */
  title?: string;
  /** Indicates whether an appointment can be assigned to several instances of this resource. */
  allowMultiple?: boolean;
  /** Resource instances. */
  instances: Array<ResourceInstance>;
};

/** Configures a resource instance. */
export type ResourceInstance = {
  /** The resource ID. */
  id: number | string;
  /** The resource instance color. */
  color?: string | Color;
  /** The resource instance text. */
  text?: string;
};
/**
 * Specifies a palette that provides colors for those resource instances
 * whose color is not defined.
 */
export type Palette = Array<string | Color>;

/**
 * The [Material-UI Color](https://material-ui.com/customization/color/#color-palette) object.
 * See [these examples](https://material-ui.com/customization/color/#examples)
 * for information on how to use it.
 */
export interface Color extends MUIColor {}

/** An object that provides information about a resource instance. */
export type ValidResourceInstance = Required<ResourceInstance> & {
  /** The resource title. */
  title: string;
  /**
   * A data field name used to assign appointments to this resource.
   * This field should be present in appointment data objects.
   */
  fieldName: string;
  /** Indicates whether an appointment can be assigned to several instances of this resource. */
  allowMultiple: boolean;
  /** Specifies the main resource kind */
  isMain: boolean;
};

/** An object that provides information about a resource. */
export type ValidResource = {
  /**
   * A data field name used to assign appointments to this resource.
   * This field should be present in appointment data objects.
   */
  fieldName: string;
  /** The resource title. */
  title: string;
  /** Indicates whether an appointment can be assigned to several instances of this resource. */
  allowMultiple: boolean;
  /** Resource instances. */
  instances: Array<ValidResourceInstance>;
  /** Specifies the main resource kind */
  isMain: boolean;
};

/** @internal */
export type GetAppointmentResources = PureComputed<
  [Appointment, Array<ValidResource>, Array<ValidResourceInstance>], Array<ValidResourceInstance>
>;

/** @internal */
export type ConvertResourcesToPlain = PureComputed<
  [Array<ValidResource>], Array<ValidResourceInstance>
>;

/** @internal */
export type ValidateResources = PureComputed<
  [Array<Resource>, string | undefined, Palette], Array<ValidResource>
>;
