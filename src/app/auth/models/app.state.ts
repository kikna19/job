import {IAppState} from "./appstate.model";
import {userState} from "./userstate.model";


export const initialAppState: IAppState = {
  user: userState
}

export function getInitialState(): IAppState {
  return initialAppState
}
