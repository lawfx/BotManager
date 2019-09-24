import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepicker
} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { JanuszService } from '../janusz.service';
import { ToastrService } from 'ngx-toastr';
import { Holiday, HolidayString } from '../interfaces';

@Component({
  selector: 'app-janusz-holidays',
  templateUrl: './janusz-holidays.component.html',
  styleUrls: ['./janusz-holidays.component.css']
})
export class JanuszHolidaysComponent implements OnInit {
  @ViewChild('picker', { static: true }) picker: MatDatepicker<Date>;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  minDate = this.getCurrentDate();

  loaded = false;

  holidays = new MatTableDataSource<HolidayString>();
  holidayColumns: string[] = ['holiday', 'actions'];

  constructor(
    private januszService: JanuszService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getHolidays();
    // console.log(this.sort);
  }

  getHolidays() {
    this.januszService.getHolidays().subscribe({
      next: (hs: Holiday[]) => {
        this.holidays = new MatTableDataSource<HolidayString>(
          hs.map(h => {
            return { id: h.id, date: this.dateToReadableHoliday(h.date) };
          })
        );
        setTimeout(() => (this.loaded = true), 500);
        // console.log(this.sort);
        // this.holidays.sort = this.sort;
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
      this.januszService.addHoliday({ date: holiday }).subscribe({
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

  dateToReadableHoliday(holidayDateString: Date) {
    const holidayDate = new Date(holidayDateString);
    const year = holidayDate.getUTCFullYear();
    const month = holidayDate.getUTCMonth();
    const date = holidayDate.getUTCDate();
    return `${date}/${month}/${year}`;
  }
}
