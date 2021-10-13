import { Component, Input, OnChanges, OnInit, SimpleChanges, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  hours: number[] = [];
  days: Date[] = []

  @Input() date?: Date;

  constructor() { }

  ngOnInit(): void {
    this._renderLayout(this.date);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) {
      this._renderLayout(changes.date.currentValue);
    }
  }

  trackByDay: TrackByFunction<Date> = (index: number, day: Date): number => {
    return day.getDay();
  }

  private _renderLayout(referenceDate = new Date()) {
    this.hours = [...Array(24).keys()].map(i => i+1);
    this.days = [...Array(7).keys()].map(i => {
      const day = new Date(referenceDate);
      const offset = day.getDay() - i;
      day.setDate(day.getDate() - offset);
      return day;
    })
  }



}
