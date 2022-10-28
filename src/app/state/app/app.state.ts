import {State} from "../auth/auth.reducer";
import {userState} from "../../auth/models/userstate.model";


export const initialAppState: State = {
  user: userState
}

export function getInitialState(): State {
  return initialAppState
}
