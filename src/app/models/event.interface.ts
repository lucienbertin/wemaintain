// using ical model here, to ease intregration of third party calendars
export interface IEvent {
	dtStart: Date;
	dtEnd: Date;
	summary: string;
}