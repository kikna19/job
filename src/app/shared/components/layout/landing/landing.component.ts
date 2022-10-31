import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isAuthenticated: boolean = !!localStorage.getItem('jwt');
  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.isAuthenticated);
  }

}
