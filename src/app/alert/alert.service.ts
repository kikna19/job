import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from './alert';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    constructor() {}

    public onAlert(id: string = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
    }
    public alert(alert: Alert): void {
        alert.id = alert.id || this.defaultId;
        alert.date = new Date();
        if (!alert.message) {
            return;
        }
        this.subject.next(alert);
    }
    public clear(id = this.defaultId): void {
        this.subject.next(new Alert({ id }));
    }

    public success(message: string, duration: number = 3000): void {
        this.alert(new Alert({ duration, type: AlertType.Success, message }));
    }

    public error(message: string, duration: number =3000): void {
        this.alert(new Alert({ duration, type: AlertType.Error, message }));
    }

    public info(message: string, duration: number = 3000): void {
        this.alert(new Alert({ duration, type: AlertType.Info, message }));
    }

    public warn(message: string, duration: number = 3000): void {
        this.alert(new Alert({ duration, type: AlertType.Warning, message }));
    }
}
