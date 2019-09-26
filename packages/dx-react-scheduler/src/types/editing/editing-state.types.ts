import { PreCommitChangesFn, ChangeSet, AppointmentModel } from '../index';

export interface EditingStateProps {
  /** The data of an appointment being edited. */
  editingAppointment?: Partial<AppointmentModel>;
  /** The initial value of the editingAppointment property in uncontrolled mode. */
  defaultEditingAppointment?: Partial<AppointmentModel>;
  /** Handles changes to the editingAppointment property value. */
  onEditingAppointmentChange?: (editingAppointment: Partial<AppointmentModel>) => void;
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
  /** Handles commiting appointment changes. */
  onCommitChanges: (changes: ChangeSet) => void;
  /** Handles commiting appointment changes. */
  preCommitChanges?: PreCommitChangesFn;
}

/** @internal */
export type EditingStateState = {
  editingAppointment: Partial<AppointmentModel>;
  addedAppointment: { [key: string]: object };
  appointmentChanges: { [key: string]: object };
};
