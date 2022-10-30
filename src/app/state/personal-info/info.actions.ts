import {Action} from "@ngrx/store";

export enum InfoActions {
  UpdateUser = '[User] Update User',
}

export interface UpdateInfo {
  control: string;
  value: string
}

export class UpdateUserInfo implements Action {
  readonly type = InfoActions.UpdateUser;

  constructor(public payload: UpdateInfo) {
  }
}

export type InfoAction = UpdateUserInfo;
