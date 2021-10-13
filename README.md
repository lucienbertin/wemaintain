# Wemaintain

## How to run

the usual ng cli commands

```
npm ci
npm start
```

tests and lint can be launch with `npm test` and `npm run lint`

for the rest, it's box standard angular cli project, check the [angular documentation](https://angular.io/docs)

## Implementations choices

### CI through gh actions

all PR targetting `main` branch are subject to ci checks which are `build`, `test` and `lint`

- build checks that the PR is shippable, if it were shipped somewhere. it also makes sure that anyone cheking out `main` should be able to run `npm ci` and `npm start` and have something working
- u tests right now are fairly poor, time has not been alloted to write some but the code is still too young to allow relevant tests to be written
- linter uses eslint in its standard configuration

### no router

right now the SPA has just 1 view so a router is not needed

still i like having a router for it allows to split the root configuration (in app.module) from the view configuration (in foo.module).

Had i had more time it would have been added for code cleanliness

if there were a router the file and folder tree wpuld have lokked something like

```
/app
	app.module
	/pages
		/foo
			foo.module
			foo.component // this one is smart, cf below
			/components
			/services
			/stores
		/bar
			bar.module
			bar.component // this one is smart, cf below
			/components
			/services
			/stores
```

allowing for cleanly separated routes and lazy loaded bundles

### event model

right now an event is just dtstart and dtend and summary because nothing else is needed with the current features. when adding different users and a users-picker/select, the event model will have to evolve, but there is no need to do it now, in accordance with the YAGNI principle

### angular material

angular material has been added fairly early in the project (see PR #4) and it was too early for that.

angular material _will be_ needed at some point, for its select, its datepicker and its dialog, but right now it is not really usefull. this addition at that time does not respect YAGNI and should not have been done.

### Smart-dumb components

the philosophy of this repo, which is not currently apparent, is that the root component of the view is smart, all other components are dumb

> right now it means that AppComponents is the only smart component
> but _if_ there were a router, all components injected by the router would be deemed smart

a dumb component should expose inputs and outpouts that are complete, allowing it to be used in any view or view context. a dumb component should not get the store injected inside it

it is the responsability of the smart component to be the conductor between the store, services and all dumb components

### events positionned absolutely over layout

layout drawn with a css grid, then over that we draw all events positionned absolutely over it

pros :
- layout is clean

cons:
- adds adherence between ui and and code computing position cuz we need to know day's width and hour's height to properly position an event
- had to force a `width:1200px` for the all calendar as a result

alternative:

one col / day, allows to link an event to a day so its horizontal positionning will always be right, then translate it verticaly to the right position

this approach should allow more dynamicly widthed days
we still need to fix "1 hour" height to properly translate the event vertically but thats alright i think as it doesn't dramatically impact responsiveness

## To Do

### Finish adding state manager

see PR #6 for details of whats missing

### enrich state with some actions

add actions pertaining to the filters for the events, i.e. the week selected so that the selector only exposes events of the selected week

### add a dumb component `app-event`

to replace these lines in calendar-component

```html
	<ng-template ngFor [ngForOf]="weekEvents" let-event>
		<div class="calendar-event" [ngStyle]="eventPosition(event)">{{event.summary}}</div>
	</ng-template>
```

### add support for several users

as per the mission statement

### add event manipulation

creation, edition, deletion, as per the mission statement

use matdialog for handling the popup

### add u tests where it matters

i.e. in the state management, checking that the selectors work properly and that actions do what they should
