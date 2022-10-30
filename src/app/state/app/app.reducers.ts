import {hydrationMetaReducer} from "./hydration.reducers";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {IAppState} from "../../auth/models/appstate.model";
import {reducer} from "../auth/auth.reducer";
import {infoReducer} from "../personal-info/info.reducer";

export const appReducers: ActionReducerMap<any, any> = {
  user: reducer,
  info: infoReducer,

}

export const metaReducers : MetaReducer[] = [hydrationMetaReducer]

