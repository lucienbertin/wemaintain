# Wemaintain

## events positionned absolutely over layout

layout drawn with a css grid, then over that we draw all events positionned absolutely over it

pros :
- layout is clean

cons:
- adds adherence between ui and and code computing position cuz we need to know day's width and hour's height to properly position an event
- had to force a `width:1200px` for the all calendar as a result

alternative:

one col / day, allows to link an event to a day so its horizontal positionning will always be right, then translate it verticaly to the right position

this approach should allow more dynamicly widthed days
we still need to fix "1 hour" height to properly translate the event vertically but thats allright i think as it doesn't dramatically impact responsiveness