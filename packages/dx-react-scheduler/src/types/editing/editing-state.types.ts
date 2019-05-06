/** Describes uncommitted changes made to the scheduler data. */
export interface ChangeSet {
  /** An array of rows to be created. */
  added?: { [key: string]: object };
  // tslint:disable-next-line:max-line-length
  /** An associative array that stores changes made to existing data. Each array item specifies changes made to a row. The item's key specifies the associated row's ID. */
  changed?: { [key: string]: object };
  /** An array of IDs representing rows to be deleted. */
  deleted?: number | string;
}

export interface EditingStateProps {
  /** The identifier of an appointment being edited. */
  editingAppointmentId?: number | string;
  /** The initial value of the editingAppointmentId property in uncontrolled mode. */
  defaultEditingAppointmentId?: number | string;
  /** Handles changes to the editingAppointmentId property value. */
  onEditingAppointmentIdChange?: (editingAppointmentId: number | string) => void;
  /** A created but not committed appointment. */
  addedAppointment?: object;
  /** The initial value of the addedAppointment property in uncontrolled mode. */
  defaultAddedAppointment?: object;
  /** Handles changes to the addedAppointment property value. */
  onAddedAppointmentChange?: (addedAppointment: object) => void;
  /** Uncommitted appointment changes. */
  appointmentChanges?: { [key: string]: object };
  /** The initial value of the appointmentChanges property in uncontrolled mode. */
  defaultAppointmentChanges?: { [key: string]: object };
  /** Handles changes to the appointmentChanges property value. */
  onAppointmentChangesChange?: (appointmentChanges: { [key: string]: any }) => void;
  /**	Handles commiting appointment changes. */
  onCommitChanges: (changes: ChangeSet) => void;
}

/** @internal */
export type EditingStateState = {
  editingAppointmentId: number | string;
  addedAppointment: { [key: string]: object };
  appointmentChanges: { [key: string]: object };
};
