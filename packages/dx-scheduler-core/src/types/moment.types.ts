import * as momentCore from 'moment';

/* tslint:disable-next-line: no-namespace */
export namespace moment {
  type MomentInput = momentCore.MomentInput | Readonly<momentCore.MomentInput>;
}
