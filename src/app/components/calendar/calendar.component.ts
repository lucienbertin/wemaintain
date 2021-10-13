import { Component, Input, OnChanges, OnInit, SimpleChanges, TrackByFunction } from '@angular/core';
import { IEvent } from '../../models/event.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() date?: Date;
  @Input() events?: IEvent[];

  hours: number[] = [];
  days: Date[] = []
  weekEvents: IEvent[] = [];

  constructor() { }

  ngOnInit(): void {
    this._renderLayout(this.date);
    this._renderEvents(this.events);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) {
      this._renderLayout(changes.date.currentValue);
      this._renderEvents(this.events);
    }
    if (changes.events) {
      this._renderEvents(changes.events.currentValue);
    }
  }

  trackByDay: TrackByFunction<Date> = (index: number, day: Date): number => {
    return day.getDay();
  }

  eventPosition(event: IEvent): { top: string, left: string, height: string } {
    const top = 24 + event.dtStart.getHours() * 60 + event.dtStart.getMinutes();
    const left = 38 + 166 * event.dtStart.getDay();
    const duration = (event.dtEnd.getTime() - event.dtStart.getTime()) / (1000 * 60);
    const height = duration;

    return {
      top: `${top}px`,
      left: `${left}px`,
      height: `${height}px`,
    }
  }

  private _renderLayout(referenceDate = new Date()): void {
    this.hours = [...Array(24).keys()].map(i => i+1);
    this.days = [...Array(7).keys()].map(i => {
      const day = new Date(referenceDate);
      const offset = day.getDay() - i;
      day.setDate(day.getDate() - offset);
      day.setHours(0);
      day.setMinutes(0);
      day.setSeconds(0);
      day.setMilliseconds(0);
      return day;
    })
  }

  private _renderEvents(events: IEvent[] = []): void {
    // this component should make sure it only display events in the correct daterange
    // even though it should only receive events in the correct daterange
    this.weekEvents = events.filter(evt => {
      const weekStart = new Date(this.days[0]);
      const weekEnd = new Date(this.days[6]);
      weekEnd.setDate(this.days[6].getDate() + 1);
      const isBeforeWeekStart = evt.dtStart.getTime() - weekStart.getTime() < 0;
      const isAfterWeekEnd = evt.dtEnd.getTime() - weekEnd.getTime() > 0;

      return !isBeforeWeekStart && !isAfterWeekEnd;
    });
  }

}
