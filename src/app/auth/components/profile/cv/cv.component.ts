import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('file', {static: false}) file!: ElementRef<HTMLInputElement>

  constructor() { }

  ngOnInit(): void {
  }

  onChange(): void {
    console.log(this.file.nativeElement.value);
  }


}
