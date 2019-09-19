import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Notification, Message } from '../interfaces';
import { MatCheckbox } from '@angular/material/checkbox';
import { JanuszService } from '../janusz.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css'],
  // Need to remove view encapsulation so that the custom tooltip style will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None
})
export class NotificationDialogComponent implements OnInit {
  @ViewChild('label', { static: false }) label: ElementRef;
  @ViewChild('author', { static: false }) author: ElementRef;
  @ViewChild('month', { static: false }) month: ElementRef;
  @ViewChild('date', { static: false }) date: ElementRef;
  @ViewChild('hour', { static: false }) hour: ElementRef;
  @ViewChild('minute', { static: false }) minute: ElementRef;
  @ViewChild('activeOnHolidays', { static: false })
  activeOnHolidays: MatCheckbox;
  @ViewChild('active', { static: false }) active: MatCheckbox;
  @ViewChild('dayOfWeek', { static: false }) dayOfWeek: ElementRef;
  @ViewChild('message', { static: false }) message: ElementRef;
  @ViewChild('createButton', { static: false }) createButton: MatButton;

  constructor(
    private januszService: JanuszService,
    private dialogRef: MatDialogRef<NotificationDialogComponent>
  ) {}

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onCreate() {
    this.createButton.disabled = true;

    const notification: Notification = {
      label: this.label.nativeElement.value,
      creator: this.author.nativeElement.value,
      active: this.active.checked,
      activeOnHolidays: this.activeOnHolidays.checked,
      month: this.month.nativeElement.value,
      date: this.date.nativeElement.value,
      hour: this.hour.nativeElement.value,
      minute: this.minute.nativeElement.value,
      dayOfWeek: this.dayOfWeek.nativeElement.value
    };
    const message: Message = {
      author: this.author.nativeElement.value,
      message: this.message.nativeElement.value
    };

    this.januszService
      .createNotification(notification, message)
      .subscribe(res => {
        this.dialogRef.close(true);
      });
  }

  // translateSchedule() {
  //   return 'lawfx';
  // }
}
