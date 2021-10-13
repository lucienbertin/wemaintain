import { Component, OnInit, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  hours: number[] = [];
  days: Date[] = []
  constructor() { }

  ngOnInit(): void {
    this.hours = [...Array(24).keys()].map(i => i+1);
    this.days = [...Array(7).keys()].map(i => {
      const day = new Date();
      const offset = day.getDay() - i;
      day.setDate(day.getDate() - offset);
      return day;
    })
  }

  trackByDay: TrackByFunction<Date> = (index: number, day: Date): number => {
    return day.getDay();
  }

}
