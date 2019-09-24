import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepicker
} from '@angular/material/datepicker';

import { JanuszService } from '../janusz.service';
import { ToastrService } from 'ngx-toastr';
import { Holiday } from '../interfaces';

@Component({
  selector: 'app-janusz-holidays',
  templateUrl: './janusz-holidays.component.html',
  styleUrls: ['./janusz-holidays.component.css']
})
export class JanuszHolidaysComponent implements OnInit {
  @ViewChild('picker', { static: false }) picker: MatDatepicker<Date>;

  minDate = this.getCurrentDate();

  loaded = false;

  holidays: Holiday[] = [];
  holidayColumns: string[] = ['date', 'actions'];

  constructor(
    private januszService: JanuszService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getHolidays();
  }

  getHolidays() {
    this.januszService.getHolidays().subscribe({
      next: (hs: Holiday[]) => {
        this.holidays = hs
          .sort((a, b) => {
            return this.compareHoliday(a, b);
          })
          .map(h => {
            return {
              id: h.id,
              date: this.dateToReadableHoliday(h.date)
            };
          });
        setTimeout(() => (this.loaded = true), 500);
      },
      error: err => {
        console.error(err);
        this.toastr.error('Holidays fetch failed');
        setTimeout(() => (this.loaded = true), 500);
      }
    });
  }

  onAddHoliday(event: MatDatepickerInputEvent<Date>) {
    if (event.value !== null) {
      const holiday = event.value;
      holiday.setUTCDate(holiday.getUTCDate() + 1);
      this.januszService.addHoliday({ date: holiday.toString() }).subscribe({
        next: () => {
          this.toastr.success('Holiday added');
          this.getHolidays();
        },
        error: err => {
          console.error(err);
          this.toastr.error('Holiday addition failed');
        }
      });
      this.picker.select(undefined);
    }
  }

  onDeleteHoliday(id: number) {
    // TODO add confirmation
    this.januszService.deleteHoliday(id).subscribe({
      next: () => {
        this.toastr.success('Holiday deleted');
        this.getHolidays();
      },
      error: err => {
        console.error(err);
        this.toastr.error('Holiday deletion failed');
      }
    });
  }

  getCurrentDate(): Date {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  dateToReadableHoliday(holidayDateString: string) {
    const holidayDate = new Date(holidayDateString);
    const year = holidayDate.getUTCFullYear();
    const month =
      holidayDate.getUTCMonth().toString().length === 1
        ? '0' + (holidayDate.getUTCMonth() + 1)
        : holidayDate.getUTCMonth() + 1;
    const date =
      holidayDate.getUTCDate().toString().length === 1
        ? '0' + holidayDate.getUTCDate()
        : holidayDate.getUTCDate();
    return `${date}/${month}/${year}`;
  }

  compareHoliday(a: Holiday, b: Holiday): number {
    const aFullDate = new Date(a.date);
    const aYear = aFullDate.getUTCFullYear();
    const aMonth = aFullDate.getUTCMonth();
    const aDate = aFullDate.getUTCDate();
    const bFullDate = new Date(b.date);
    const bYear = bFullDate.getUTCFullYear();
    const bMonth = bFullDate.getUTCMonth();
    const bDate = bFullDate.getUTCDate();
    if (
      aYear < bYear ||
      (aYear === bYear && aMonth < bMonth) ||
      (aYear === bYear && aMonth === bMonth && aDate < bDate)
    ) {
      return -1;
    }
    return 1;
  }
}
