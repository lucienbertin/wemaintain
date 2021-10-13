import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  events = [
    { dtStart: new Date("2021-10-03T12:15:00Z"), dtEnd: new Date("2021-10-03T13:00:00Z"), summary: "last week" },
    { dtStart: new Date("2021-10-13T12:15:00Z"), dtEnd: new Date("2021-10-13T13:00:00Z"), summary: "this week" },
    { dtStart: new Date("2021-10-14T11:15:00Z"), dtEnd: new Date("2021-10-14T14:00:00Z"), summary: "this week" },
    { dtStart: new Date("2021-10-23T11:15:00Z"), dtEnd: new Date("2021-10-23T14:00:00Z"), summary: "next week" },
  ]
  date = new Date();
}
