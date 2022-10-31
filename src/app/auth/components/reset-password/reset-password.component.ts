import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap(
        (param: any) =>
          this.authService.resetPassword(param.email, param.code,'')
      )
    ).subscribe(console.log)
  }

}
