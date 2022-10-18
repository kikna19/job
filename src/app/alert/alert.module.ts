import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';


@NgModule({
    declarations: [AlertComponent],
    imports: [CommonModule],
    exports: [AlertComponent],
})
export class AlertModule {}
