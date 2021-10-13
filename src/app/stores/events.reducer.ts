import { Action, createReducer } from '@ngrx/store';
import { IEvent } from '../models/event.interface';

export interface IEventsState {
	events: IEvent[];
}

export const initialState: IEventsState = {
	events: [
		{ dtStart: new Date("2021-10-03T12:15:00Z"), dtEnd: new Date("2021-10-03T13:00:00Z"), summary: "last week" },
		{ dtStart: new Date("2021-10-13T12:15:00Z"), dtEnd: new Date("2021-10-13T13:00:00Z"), summary: "this week" },
		{ dtStart: new Date("2021-10-14T11:15:00Z"), dtEnd: new Date("2021-10-14T14:00:00Z"), summary: "this week" },
		{ dtStart: new Date("2021-10-23T11:15:00Z"), dtEnd: new Date("2021-10-23T14:00:00Z"), summary: "next week" },
	],
};
const _eventsReducer = createReducer(
  initialState,
);
 
export function eventsReducer(state: IEventsState, action: Action) {
  return _eventsReducer(state, action);
}