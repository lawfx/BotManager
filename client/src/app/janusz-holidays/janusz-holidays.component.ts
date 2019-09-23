import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepicker
} from '@angular/material/datepicker';

@Component({
  selector: 'app-janusz-holidays',
  templateUrl: './janusz-holidays.component.html',
  styleUrls: ['./janusz-holidays.component.css']
})
export class JanuszHolidaysComponent implements OnInit {
  @ViewChild('picker', { static: true }) picker: MatDatepicker<Date>;

  minDate = this.getCurrentDate();

  constructor() {}

  ngOnInit() {}

  addHoliday(event: MatDatepickerInputEvent<Date>) {
    // TODO add holiday to db
    this.picker.select(undefined);
  }

  getCurrentDate() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }
}
