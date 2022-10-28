import {hydrationMetaReducer} from "./hydration.reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {IAppState} from "../../auth/models/appstate.model";
import {reducer} from "../auth/auth.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  user: reducer
}

export const metaReducers : MetaReducer[] = [hydrationMetaReducer]

