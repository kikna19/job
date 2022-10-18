import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../alert';
import { AlertService } from '../../alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('slide', [
            transition(':enter', [
                style({ transform: 'translateX(50%)', opacity: 0 }),
                animate('.4s ease-in', style({ transform: 'translateX(0)', opacity: 1 })),
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)', opacity: 1 }),
                animate('.4s ease-out', style({ transform: 'translateX(50%)', opacity: 0 })),
            ]),
        ]),
    ],
})
export class AlertComponent implements OnInit, OnDestroy {
    @Input()
    public id = 'default-alert';

    public alerts: Alert[] = [];
    private alert$!: Subscription;

    constructor(private alertService: AlertService) {}

    public ngOnInit(): void {
        this.alert$ = this.alertService.onAlert(this.id).subscribe((alert) => {
            this.alerts.push(alert);
            if (alert.duration !== 0) {
                setTimeout(() => {
                    this.close(alert);
                }, alert.duration);
            }
        });
    }

    public ngOnDestroy(): void {
        this.alert$?.unsubscribe();
    }

    public close(alert: Alert): void {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }

    public addClass(alert: Alert): string {
        if (!alert) {
            return '';
        }

        const alertTypeClasses = {
            [AlertType.Success]: 'notification-success',
            [AlertType.Error]: 'notification-error',
            [AlertType.Info]: 'notification-info',
            [AlertType.Warning]: 'notification-warning',
        };
        alert.type=AlertType.Error;
        return alertTypeClasses[alert.type];
    }
}
