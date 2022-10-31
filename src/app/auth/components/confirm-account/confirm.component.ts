import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {

  private id: string;
  private code: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap(
        (param: any) =>
          this.authService.confirmAccount(param.id, param.code)
      )
    ).subscribe(console.log)
  }
}
