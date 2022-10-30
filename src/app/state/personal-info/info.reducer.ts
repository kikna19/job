import {InfoAction, InfoActions} from "./info.actions";

export const infoReducer = (
  state: InfoAction,
  action: InfoAction,
) => {
  switch (action.type) {
    case InfoActions.UpdateUser: {
      return {
        ...state,
        ...action
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
