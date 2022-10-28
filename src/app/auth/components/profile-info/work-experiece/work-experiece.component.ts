import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-work-experiece',
  templateUrl: './work-experiece.component.html',
  styleUrls: ['./work-experiece.component.scss']
})
export class WorkExperieceComponent implements OnInit {

  @ViewChild('stack', {static: false}) stackEl: ElementRef;
  showErrMsg: boolean = false;
  @Input() form: FormGroup;
  btnStacks: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }


  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }


  saveFormControl(form: FormGroup, control: string): void {
    form.get(control)?.disable();
  }


  checkDisable(form: FormGroup, control: string): boolean {
    return !!form.get(control)?.disabled;
  }

  updateFormControlValue(elementId: any): void {
    elementId.classList.remove('border-r', 'rounded-br-md', 'rounded-tr-md');
  }


  add(): void {
    const stack = <FormControl>this.form.get('stack');
    const stackEl = this.stackEl.nativeElement;
    if (stackEl.value) {
      this.btnStacks.push(stackEl.value);
      stackEl.value = '';
    }
    if (this.btnStacks.length >= 3) {
      stack?.setValue(this.btnStacks);
      stack?.disable();
    }
  }

  removeSkill(index: number): void {
    this.btnStacks.splice(index, 1);
    this.form.get('stack')?.setValue(this.btnStacks);
    if (this.btnStacks.length < 3)
      this.form.get('stack')?.enable();
  }
}
