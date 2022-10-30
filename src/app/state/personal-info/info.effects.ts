import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {flatMap, map, mergeMap, switchMap} from "rxjs";
import {InfoActions, UpdateUserInfo} from "./info.actions";
import {ProfileInfoService} from "../../auth/services/profile-info.service";

@Injectable({
  providedIn: 'root'
})
export class InfoEffects {
  constructor(
    private infoAction$: Actions,
    private profileInfoService: ProfileInfoService
  ) {
  }

  updateInfo$ = createEffect(() =>
    this.infoAction$.pipe(
      ofType(InfoActions.UpdateUser),
      mergeMap((action: UpdateUserInfo) =>
        this.profileInfoService.updateUser(action.payload.control, action.payload.value)
      )
    )
  )
}
