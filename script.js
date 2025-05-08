let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
let screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

let debug = false
let type = 0
let max_type = 1
var chance = new Chance()
let hue = 0

let stars = []
let modifier = 0
let modifier_time = 0

while (stars.length < 100) {
  stars.push(Math.floor(Math.random() * screen_width) + "/" + Math.floor(Math.random() * screen_height) + "-" + Math.floor(Math.random() * screen_width) + "/" + Math.floor(Math.random() * screen_height))
}

function setup() {
  createCanvas(screen_width, screen_height - 10)
  background("#FFFFFF")
  window.confirm("Diese Website verwendet Cookies. Einverstanden? Wenn nicht, clicke abbrechen.\n\n[ESC] = Hilfe und Debug Infos")
  frameRate(60)
  strokeWeight(1)
  colorMode(HSL)
}

function draw() {
  background("#000000")
  let new_stars = []
  let line_coords = false
  for (let i of stars) {
    let coordinatesArray = i.split("-");

    let firstCoords = coordinatesArray[0].split("/").map(Number);
    let secondCoords = coordinatesArray[1].split("/").map(Number);

    let angle = Math.atan2(secondCoords[1] - firstCoords[1], secondCoords[0] - firstCoords[0]);

    firstCoords[0] += 5 * Math.cos(angle)
    firstCoords[1] += 5 * Math.sin(angle)

    let new_coords = firstCoords[0].toFixed(2) + "/" + firstCoords[1].toFixed(2)

    let new_i = new_coords + "-" + coordinatesArray[1]

    if (Math.abs(firstCoords[0] - secondCoords[0]) < 10 && Math.abs(firstCoords[1] - secondCoords[1]) < 10) {
      let new_x = 0
      let new_y = 0
      if (type == 1 && modifier == 1) {
        new_x = chance.integer({ min: screen_width / 2 - 50, max: screen_width / 2 + 50 })
        new_y = chance.integer({ min: screen_height / 2 - 50, max: screen_height / 2 + 50 })
      } else {
        new_x = chance.integer({ min: 1, max: screen_width })
        new_y = chance.integer({ min: 1, max: screen_height })
        if (type == 1) {
          if (millis() - 3000 > modifier_time) {
            modifier = 1
          }
        }
      }
      new_i = new_i.split("-")[0] + "-" + new_x + "/" + new_y
    }
    new_stars.push(new_i)

    if (type == 1) {
      let out_of_bounds = false
      for (let i of stars) {
        if (i.split("-")[0].split("/")[0] < 55 + screen_width / 2 && i.split("-")[0].split("/")[0] > -55 + screen_width / 2 && i.split("-")[0].split("/")[1] < 55 + screen_height / 2 && i.split("-")[0].split("/")[1] > -55 + screen_height / 2) {
        } else {
          if (!out_of_bounds) {console.log("hdfus")}
          out_of_bounds = true
        }
      }
      if (!out_of_bounds) {
        modifier = 0
        modifier_time = millis()
      }
    }

    fill(hue, 80, 50)
    circle(new_i.split("-")[0].split("/")[0], new_i.split("-")[0].split("/")[1], 20)
  }
  stars = [...new_stars]

  hue > 359 ? hue = 0 : hue++
}

function mousePressed() {
  // window.close()
}

function keyPressed() {
  if (keyCode === ESCAPE) { debug ? debug = false : debug = true }
  if (keyCode === BACKSPACE) { window.close() }
  if (keyCode === ENTER) { type + 1 > max_type ? type = 0 : type++ }
}