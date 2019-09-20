import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Notification,
  Message,
  JanuszNotificationDialogData
} from '../interfaces';
import { MatCheckbox } from '@angular/material/checkbox';
import { JanuszService } from '../janusz.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-janusz-notification-dialog',
  templateUrl: './janusz-notification-dialog.component.html',
  styleUrls: ['./janusz-notification-dialog.component.css']
})
export class JanuszNotificationDialogComponent
  implements OnInit, AfterViewInit {
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
  @ViewChild('editButton', { static: false }) editButton: MatButton;

  constructor(
    private januszService: JanuszService,
    private dialogRef: MatDialogRef<JanuszNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JanuszNotificationDialogData
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.data.isCreating) {
        this.label.nativeElement.value = this.data.notification.label;
        this.author.nativeElement.value = this.data.notification.creator;
        this.month.nativeElement.value = this.data.notification.month;
        this.date.nativeElement.value = this.data.notification.date;
        this.hour.nativeElement.value = this.data.notification.hour;
        this.minute.nativeElement.value = this.data.notification.minute;
        this.dayOfWeek.nativeElement.value = this.data.notification.dayOfWeek;
        this.active.checked = this.data.notification.active;
        this.activeOnHolidays.checked = this.data.notification.activeOnHolidays;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
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

    this.januszService.createNotification(notification, message).subscribe({
      next: () => this.dialogRef.close(1),
      error: err => {
        console.error(err);
        this.dialogRef.close(0);
      }
    });
  }

  onEdit() {
    this.editButton.disabled = true;

    const notification: Notification = {
      id: this.data.notification.id,
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

    this.januszService.updateNotification(notification).subscribe({
      next: () => this.dialogRef.close(1),
      error: err => {
        console.error(err);
        this.dialogRef.close(0);
      }
    });
  }

  // translateSchedule() {
  //   return 'lawfx';
  // }
}
