import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-work-experiece',
  templateUrl: './work-experiece.component.html',
  styleUrls: ['./work-experiece.component.scss']
})
export class WorkExperieceComponent implements OnInit {

  @Input() form: FormGroup;
  btnStacks: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }

  add() {
    const stack = <FormControl>this.form.get('stack');
    this.btnStacks.push(stack.value);
    stack.setValue('');
  }

  removeSkill(index: number): void {
    this.btnStacks.splice(index, 1)
  }



}
