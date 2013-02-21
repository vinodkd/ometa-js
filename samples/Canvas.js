// This will add a new canvas element to this page
canvas = document.createElement('canvas')
canvas.setAttribute('width',  '500')
canvas.setAttribute('height', '275')
$('playArea').appendChild(canvas)


// Now we'll draw something on it
ctxt = canvas.getContext('2d')
ctxt.fillStyle = 'rgb(200,0,0)'
ctxt.fillRect(10, 10, 55, 50)
ctxt.fillStyle = 'rgba(0,0,200,0.5)'
ctxt.fillRect(30, 30, 55, 50)

// And now we'll do something interesting with it...

Scheduler = function() {
  this.tasks   = []
  this.timeout = 20
  this.tick()
}
Scheduler.prototype.schedule = function(t) { this.tasks.push(t) }
Scheduler.prototype.tick = function() {
  var s = this
  if (this.tasks.length > 0)
    this.tasks.shift()()
  setTimeout(function() { s.tick() }, this.timeout)
}

theScheduler = new Scheduler()

Turtle = function() {
  this.x       = 250
  this.y       = 60
  this.angle   = 0
  this.color   = "black"
  this.penDown = true
}
Turtle.prototype.forwardBy = function(n) {
  var s = this
  theScheduler.schedule(function() {
    ctxt.strokeStyle = s.color
    ctxt.beginPath()
    ctxt.moveTo(s.x, s.y)
    s.x += n * Math.cos(s.angle)
    s.y += n * Math.sin(s.angle)
    if (s.penDown)
      ctxt.lineTo(s.x, s.y)
    ctxt.stroke()
  })
}
Turtle.prototype.turnBy = function(n) {
  var s = this
  theScheduler.schedule(function() { s.angle += n * Math.PI / 180 })
}

/*
smiley = new Turtle()
smiley.color = "blue"
for (var i = 1; i <= 80; i++) {
  smiley.forwardBy(2 * i)
  smiley.turnBy(89)
}
*/

// this will remove it after your done with this example
// $('playArea').removeChild(canvas)

